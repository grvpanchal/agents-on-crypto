'use client';

import { useEffect } from 'react';
import { useWeb3 } from '@/context/Web3Context';
import { NFTGrid } from '@/components/nft/NFTGrid';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchNFTs } from '@/store/reducers/nftSlice';
import { Skeleton } from '@/components/ui/skeleton';

export function CreatedNFTs() {
  const { address } = useWeb3();
  const dispatch = useAppDispatch();
  const { items: nfts, loading } = useAppSelector((state) => state.nft);
  
  useEffect(() => {
    dispatch(fetchNFTs());
  }, [dispatch]);
  
  const createdNFTs = nfts.filter(
    nft => nft.creatorAddress === address || nft.creator === address
  );
  
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
  
  if (createdNFTs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No created NFTs found</h3>
        <p className="text-muted-foreground">
          You haven&apos;t created any NFTs yet. Start creating your first NFT.
        </p>
      </div>
    );
  }
  
  return <NFTGrid nfts={createdNFTs} />;
}