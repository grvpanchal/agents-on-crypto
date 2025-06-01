'use client';

import { useState } from 'react';
import { useWeb3 } from '@/context/Web3Context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { NFTType } from '@/types/nft';
import { ShoppingCart, Tag, Clock, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface NFTActionsProps {
  nft: NFTType;
}

export function NFTActions({ nft }: NFTActionsProps) {
  const [showMakeOfferDialog, setShowMakeOfferDialog] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isMakingOffer, setIsMakingOffer] = useState(false);
  
  const { connected, connectWallet } = useWeb3();
  const { toast } = useToast();
  
  const handleBuyNow = async () => {
    if (!connected) {
      connectWallet();
      return;
    }
    
    setIsPurchasing(true);
    
    // Simulate purchase transaction
    setTimeout(() => {
      setIsPurchasing(false);
      toast({
        title: "Purchase Successful!",
        description: `You are now the proud owner of ${nft.name}.`,
      });
    }, 2000);
  };
  
  const handleMakeOffer = async () => {
    if (!offerAmount) return;
    
    setIsMakingOffer(true);
    
    // Simulate offer transaction
    setTimeout(() => {
      setIsMakingOffer(false);
      setShowMakeOfferDialog(false);
      toast({
        title: "Offer Submitted",
        description: `Your offer of ${offerAmount} ETH for ${nft.name} has been submitted.`,
      });
      setOfferAmount('');
    }, 2000);
  };
  
  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            size="lg"
            className="w-full"
            onClick={handleBuyNow}
            disabled={isPurchasing}
          >
            {isPurchasing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                  <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Buy Now
              </>
            )}
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={() => setShowMakeOfferDialog(true)}
          >
            <Tag className="mr-2 h-5 w-5" />
            Make Offer
          </Button>
        </div>
        
        {!connected && (
          <div className="p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle size={16} />
              <p className="text-sm font-medium">
                Connect your wallet to buy or make offers
              </p>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-center p-4 bg-muted/60 rounded-lg">
          <Clock className="h-5 w-5 text-muted-foreground mr-2" />
          <span className="text-sm text-muted-foreground">
            Sale ends June 22, 2025 at 9:30pm GMT+1
          </span>
        </div>
      </div>
      
      {/* Make Offer Dialog */}
      <Dialog open={showMakeOfferDialog} onOpenChange={setShowMakeOfferDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Make an Offer</DialogTitle>
            <DialogDescription>
              Make an offer on {nft.name}. The owner will be notified of your offer.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Offer Amount (ETH)
              </label>
              <Input
                id="amount"
                type="number"
                step="0.001"
                min="0.001"
                placeholder="Enter amount in ETH"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Current floor price: {nft.price} ETH
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMakeOfferDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleMakeOffer} 
              disabled={!offerAmount || isMakingOffer}
            >
              {isMakingOffer ? "Processing..." : "Submit Offer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}