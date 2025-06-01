'use client';

import { useState } from 'react';
import { NFTCard } from '@/components/nft/NFTCard';
import { NFTType } from '@/types/nft';
import { Button } from '@/components/ui/button';

interface NFTGridProps {
  nfts: NFTType[];
  initialLimit?: number;
}

export function NFTGrid({ nfts, initialLimit = 8 }: NFTGridProps) {
  const [limit, setLimit] = useState(initialLimit);
  
  const showLoadMore = limit < nfts.length;
  
  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 8);
  };
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {nfts.slice(0, limit).map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </div>
      
      {showLoadMore && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={handleLoadMore}
            className="mt-8"
          >
            Load More
          </Button>
        </div>
      )}
      
      {nfts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No NFTs Found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or browse other categories.
          </p>
        </div>
      )}
    </div>
  );
}