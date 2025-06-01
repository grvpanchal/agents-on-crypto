'use client';

import { useAppSelector } from '@/hooks/useAppSelector';
import { NFTGrid } from '@/components/nft/NFTGrid';
import { NFTType } from '@/types/nft';
import { Skeleton } from '@/components/ui/skeleton';

interface OwnedNFTsProps {
  nfts?: NFTType[];
}

export function OwnedNFTs({ nfts }: OwnedNFTsProps) {
  const { ownedNFTs, loading } = useAppSelector((state) => state.account);
  const displayNFTs = nfts || ownedNFTs;
  
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }
  
  if (displayNFTs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No NFTs found</h3>
        <p className="text-muted-foreground">
          You don't own any NFTs yet. Browse the marketplace to start your collection.
        </p>
      </div>
    );
  }
  
  return <NFTGrid nfts={displayNFTs} />;
}