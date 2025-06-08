'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NFTType } from '@/types/nft';
import { NFTCard } from '@/components/nft/NFTCard';

interface NFTMoreFromCollectionProps {
  nft: NFTType;
}

export function NFTMoreFromCollection({ nft }: NFTMoreFromCollectionProps) {
  const [relatedNFTs, setRelatedNFTs] = useState<NFTType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/nfts')
      .then(res => res.json())
      .then(data => {
        const filtered = data
          .filter((item: NFTType) => item.category === nft.category && item.id !== nft.id)
          .slice(0, 4)
        setRelatedNFTs(filtered)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [nft])
  
  if (isLoading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">More from this collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-80 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (relatedNFTs.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-16 pb-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">More from this collection</h2>
        <Button variant="ghost" asChild>
          <Link href={`/categories/${nft.category}`}>
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedNFTs.map((relatedNft) => (
          <NFTCard key={relatedNft.id} nft={relatedNft} />
        ))}
      </div>
    </div>
  );
}