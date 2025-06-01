'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Settings,
  Share2,
  Edit,
  Twitter,
  Globe,
  Copy,
  CheckCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useWeb3 } from '@/context/Web3Context';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateProfile } from '@/store/reducers/accountSlice';
import { formatAddress } from '@/lib/utils';

export function ProfileHeader() {
  const { address } = useWeb3();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.account);
  
  useEffect(() => {
    // Initialize profile if empty
    if (!profile.username) {
      dispatch(updateProfile({
        username: "CryptoCollector",
        bio: "NFT enthusiast and digital art collector. Building a diverse portfolio of unique digital assets.",
        website: "https://mywebsite.com"
      }));
    }
  }, [dispatch, profile.username]);
  
  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <div>
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 w-full rounded-xl overflow-hidden mb-6">
        <Image
          src="https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Profile cover"
          fill
          className="object-cover"
        />
        <Button 
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit cover</span>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Profile Picture */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-background -mt-12 md:-mt-16 z-10 group"
        >
          <Image
            src="https://images.pexels.com/photos/7567440/pexels-photo-7567440.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Profile picture"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Edit className="h-6 w-6 text-white" />
          </div>
        </motion.div>
        
        <div className="flex-1">
          {/* Profile Header */}
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold">{profile.username}</h1>
              <div className="flex items-center mt-1">
                <p className="text-sm text-muted-foreground mr-2">
                  {formatAddress(address || '')}
                </p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <CheckCheck className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="sr-only">Copy address</span>
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" /> Settings
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" /> Share
              </Button>
            </div>
          </div>
          
          {/* Bio */}
          <div className="mt-4">
            <p className="text-muted-foreground text-sm">
              {profile.bio}
            </p>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center mt-4 space-x-4">
            <a 
              href="https://twitter.com/cryptouser" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter size={18} />
              <span className="sr-only">Twitter</span>
            </a>
            {profile.website && (
              <a 
                href={profile.website}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe size={18} />
                <span className="sr-only">Website</span>
              </a>
            )}
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-6">
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Items</p>
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Collections</p>
            </div>
            <div>
              <p className="text-2xl font-bold">48</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
            <div>
              <p className="text-2xl font-bold">125</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}