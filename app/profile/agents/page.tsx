'use client';

import { useEffect } from 'react';
import { useWeb3 } from '@/context/Web3Context';
import { NFTGrid } from '@/components/nft/NFTGrid';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { fetchNFTs } from '@/store/reducers/nftSlice';

export default function MyAgentsPage() {
  const { address } = useWeb3();
  const dispatch = useAppDispatch();
  const { items: nfts, loading } = useAppSelector((state) => state.nft);

  useEffect(() => {
    dispatch(fetchNFTs());
  }, [dispatch]);

  const myNFTs = nfts.filter(
    nft => nft.creatorAddress === address || nft.creator === address
  );
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Agents</h1>
          <Button asChild>
            <Link href="/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Agent
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Agents</h1>
        <Button asChild>
          <Link href="/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Agent
          </Link>
        </Button>
      </div>
      
      {myNFTs.length > 0 ? (
        <NFTGrid nfts={myNFTs} />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No agents created yet</h3>
          <p className="text-muted-foreground mb-6">
            Start creating your first AI agent to list on the marketplace.
          </p>
          <Button asChild>
            <Link href="/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Agent
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}