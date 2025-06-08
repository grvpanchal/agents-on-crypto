'use client';

import { useState, useEffect } from 'react';
import { useWeb3 } from '@/context/Web3Context';
import { NFTGrid } from '@/components/nft/NFTGrid';
import { Skeleton } from '@/components/ui/skeleton';
import { NFTType } from '@/types/nft';

export default function FavoritesPage() {
  const { address } = useWeb3();
  const [favoriteNFTs, setFavoriteNFTs] = useState<NFTType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/nfts')
      .then(res => res.json())
      .then(data => {
        setFavoriteNFTs(data.slice(0, 4))
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [address])
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Favorite Agents</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Favorite Agents</h1>
      {favoriteNFTs.length > 0 ? (
        <NFTGrid nfts={favoriteNFTs} />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No favorite agents yet</h3>
          <p className="text-muted-foreground">
            Browse the marketplace and add agents to your favorites.
          </p>
        </div>
      )}
    </div>
  );
}