'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { NFTType } from '@/types/nft';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface NFTCardProps {
  nft: NFTType;
}

export function NFTCard({ nft }: NFTCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(nft.likes);
  const { toast } = useToast();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked 
        ? `${nft.name} has been removed from your favorites` 
        : `${nft.name} has been added to your favorites`,
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Simulate share functionality
    toast({
      title: "Link copied!",
      description: "NFT link has been copied to clipboard.",
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <Link href={`/nft/${nft.id}`}>
        <div className="relative aspect-square">
          <Image
            src={nft.image}
            alt={nft.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-2 right-2 flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm"
              onClick={handleLike}
            >
              <Heart 
                size={16} 
                className={cn(
                  'transition-colors',
                  isLiked ? 'fill-red-500 text-red-500' : 'fill-none text-white'
                )} 
              />
              <span className="sr-only">Like</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm"
                >
                  <MoreHorizontal size={16} />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleShare}>
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between mb-1">
            <div className="font-medium truncate">{nft.name}</div>
            <div className="text-sm text-muted-foreground">#{nft.tokenId}</div>
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <div className="relative h-5 w-5 rounded-full overflow-hidden mr-1">
              <Image
                src={nft.creatorImage}
                alt={nft.creator}
                fill
                sizes="20px"
                className="object-cover"
              />
            </div>
            {nft.creator}
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="font-medium">
                {nft.price} ETH
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Highest Bid</p>
              <p className="text-sm">
                {nft.highestBid ? `${nft.highestBid} ETH` : 'No bids yet'}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}