'use client';

import { 
  createContext, 
  useContext, 
  useState, 
  useEffect,
  ReactNode
} from 'react';
import { ethers } from 'ethers';
import { useToast } from '@/hooks/use-toast';
import type { MetaMaskInpageProvider } from '@metamask/providers';

interface Web3ContextType {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
  signer: ethers.JsonRpcSigner | null;
  provider: ethers.BrowserProvider | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  checkNetwork: () => boolean;
}

const Web3Context = createContext<Web3ContextType>({
  connected: false,
  connecting: false,
  address: null,
  chainId: null,
  balance: null,
  signer: null,
  provider: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  checkNetwork: () => false,
});

export const useWeb3 = () => useContext(Web3Context);

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  
  const { toast } = useToast();
  
  // Check if MetaMask is available
  const hasMetaMask = async () => {
    try {
      if (typeof window === 'undefined') return false;
      
      // Only import detect-provider when needed
      const detectProvider = (await import('@metamask/detect-provider')).default;
      const provider = await detectProvider({
        silent: true, // Suppress console errors
        timeout: 3000 // Wait max 3 seconds
      });
      return !!provider;
    } catch (error) {
      return false;
    }
  };
  
  // Check if the network is supported (Mainnet or Sepolia testnet)
  const checkNetwork = () => {
    if (!chainId) return false;
    // Ethereum Mainnet (1) or Sepolia testnet (11155111)
    return chainId === 1 || chainId === 11155111;
  };
  
  // Request account access
  const connectWallet = async () => {
    const isMetaMaskAvailable = await hasMetaMask();
    if (!isMetaMaskAvailable) {
      toast({
        variant: "destructive",
        title: "MetaMask not detected",
        description: "Please install MetaMask to use this feature",
      });
      return;
    }
    
    try {
      setConnecting(true);
      const ethereum = window.ethereum as MetaMaskInpageProvider;
      const accounts = (await ethereum.request({ 
        method: 'eth_requestAccounts' 
      })) as string[];
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }
      
      const ethProvider = new ethers.BrowserProvider(ethereum);
      const ethSigner = await ethProvider.getSigner();
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      const balance = await ethProvider.getBalance(accounts[0]);
      
      setProvider(ethProvider);
      setSigner(ethSigner);
      setAddress(accounts[0]);
      setChainId(parseInt(chainId as string, 16));
      setBalance(ethers.formatEther(balance));
      setConnected(true);
      
      toast({
        title: "Wallet connected",
        description: "Your wallet has been connected successfully",
      });
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: error.message || "Failed to connect wallet",
      });
    } finally {
      setConnecting(false);
    }
  };
  
  // Disconnect wallet
  const disconnectWallet = () => {
    setConnected(false);
    setAddress(null);
    setChainId(null);
    setBalance(null);
    setSigner(null);
    setProvider(null);
    
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  };
  
  // Setup event listeners
  useEffect(() => {
    const setupListeners = async () => {
      // Check if we're in a browser environment and ethereum is available
      if (typeof window === 'undefined' || !window.ethereum) return;
      
      const ethereum = window.ethereum as MetaMaskInpageProvider;
      
      const handleChainChanged = (chainId: unknown) => {
        setChainId(parseInt(chainId as string, 16));
        
        toast({
          title: "Network changed",
          description: "The blockchain network has been changed",
        });
      };
      
      const handleAccountsChanged = (accounts: unknown) => {
        const newAccounts = accounts as string[];
        if (newAccounts.length === 0) {
          disconnectWallet();
        } else if (newAccounts[0] !== address) {
          setAddress(newAccounts[0]);
          
          toast({
            title: "Account changed",
            description: "Your connected account has changed",
          });
        }
      };
      
      const handleConnect = () => {
        connectWallet();
      };
      
      const handleDisconnect = () => {
        disconnectWallet();
        
        toast({
          variant: "destructive",
          title: "Disconnected",
          description: "Your wallet has been disconnected from the site",
        });
      };
      
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('connect', handleConnect);
      ethereum.on('disconnect', handleDisconnect);
      
      // Cleanup event listeners
      return () => {
        ethereum.removeListener('chainChanged', handleChainChanged);
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('connect', handleConnect);
        ethereum.removeListener('disconnect', handleDisconnect);
      };
    };
    
    setupListeners();
  }, [address]);
  
  return (
    <Web3Context.Provider
      value={{
        connected,
        connecting,
        address,
        chainId,
        balance,
        signer,
        provider,
        connectWallet,
        disconnectWallet,
        checkNetwork,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}