'use client';

import { useEffect } from 'react';
import { NFTDetails } from '@/components/nft/NFTDetails';
import { NFTActions } from '@/components/nft/NFTActions';
import { NFTHistory } from '@/components/nft/NFTHistory';
import { NFTMoreFromCollection } from '@/components/nft/NFTMoreFromCollection';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchNFTs } from '@/store/reducers/nftSlice';
import Image from 'next/image';

export function NFTPage({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const { items: nfts, loading } = useAppSelector((state) => state.nft);
  
  useEffect(() => {
    dispatch(fetchNFTs());
  }, [dispatch]);

  const nft = nfts.find((nft) => nft.id.toString() === params.id);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="animate-pulse">
              <div className="aspect-square rounded-xl bg-muted"></div>
              <div className="h-64 mt-8 bg-muted rounded-lg"></div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-24 bg-muted rounded"></div>
              <div className="h-12 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!nft) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">NFT Not Found</h1>
        <p className="text-muted-foreground">
          The NFT you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-border">
            <Image 
              src={nft.image}
              alt={nft.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <NFTHistory nft={nft} />
        </div>
        
        <div className="lg:w-1/2">
          <NFTDetails nft={nft} />
          <NFTActions nft={nft} />
        </div>
      </div>
      
      <NFTMoreFromCollection nft={nft} />
    </div>
  );
}