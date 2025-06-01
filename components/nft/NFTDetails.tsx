'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Share2, Flag, Clock, BadgeCheck, Tag, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { NFTType } from '@/types/nft';
import { formatAddress } from '@/lib/utils';

interface NFTDetailsProps {
  nft: NFTType;
}

export function NFTDetails({ nft }: NFTDetailsProps) {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-4">
        <Badge variant="outline" className="px-3">
          {nft.category}
        </Badge>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart 
                    className={isLiked ? 'fill-red-500 text-red-500' : ''} 
                    size={20} 
                  />
                  <span className="sr-only">Like</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isLiked ? 'Remove from favorites' : 'Add to favorites'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Share2 size={20} />
                  <span className="sr-only">Share</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this NFT</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Flag size={20} />
                  <span className="sr-only">Report</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Report this NFT</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-1"
      >
        {nft.name}
      </motion.h1>
      
      <div className="flex items-center mb-6">
        <Link href={`/profile/${nft.creatorAddress}`} className="flex items-center group">
          <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
            <Image
              src={nft.creatorImage}
              alt={nft.creator}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium group-hover:text-primary transition-colors">
            {nft.creator}
          </span>
          {nft.verified && (
            <BadgeCheck size={16} className="ml-1 text-primary" />
          )}
        </Link>
      </div>
      
      <div className="p-4 bg-card border border-border rounded-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-muted-foreground">
            <Clock size={16} className="mr-2" />
            <span className="text-sm">Sale ends in</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Eye size={16} className="mr-2" />
            <span className="text-sm">{nft.views} views</span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center">
            <div className="text-xl font-semibold">2</div>
            <div className="text-xs text-muted-foreground">Days</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold">8</div>
            <div className="text-xs text-muted-foreground">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold">32</div>
            <div className="text-xs text-muted-foreground">Minutes</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold">10</div>
            <div className="text-xs text-muted-foreground">Seconds</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center">
          <Tag className="mr-2 h-5 w-5 text-muted-foreground" />
          <span className="font-medium">Current price</span>
        </div>
        
        <div className="flex items-center">
          <div className="text-3xl font-bold mr-2">{nft.price} ETH</div>
          <div className="text-muted-foreground">(≈ ${(nft.price * 2500).toLocaleString()})</div>
        </div>
      </div>
      
      <div className="border border-border rounded-lg p-4 mb-8">
        <h3 className="font-medium mb-2">Description</h3>
        <p className="text-muted-foreground text-sm">
          {nft.description || 
            "This unique NFT represents digital ownership of an exclusive piece of art on the blockchain. Each token is one-of-a-kind and provides the owner with special benefits and bragging rights within the community."}
        </p>
      </div>
      
      <div className="border border-border rounded-lg p-4">
        <h3 className="font-medium mb-3">Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Contract Address</span>
            <span className="font-mono">{formatAddress(nft.contractAddress || '0x1a2b3c4d5e6f7g8h9i0j')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Token ID</span>
            <span>{nft.tokenId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Token Standard</span>
            <span>ERC-721</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Blockchain</span>
            <span>Ethereum</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Creator Royalties</span>
            <span>5%</span>
          </div>
        </div>
      </div>
    </div>
  );
}