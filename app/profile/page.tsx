'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWeb3 } from '@/context/Web3Context';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { OwnedNFTs } from '@/components/profile/OwnedNFTs';
import { CreatedNFTs } from '@/components/profile/CreatedNFTs';
import { ProfileActivity } from '@/components/profile/ProfileActivity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { fetchOwnedNFTs } from '@/store/reducers/accountSlice';

export default function ProfilePage() {
  const { address, connected } = useWeb3();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { profile, favoriteNFTs } = useAppSelector((state) => state.account);

  useEffect(() => {
    if (!connected) {
      router.push('/');
    } else {
      dispatch(fetchOwnedNFTs());
    }
  }, [connected, router, dispatch]);

  if (!connected) {
    return null; // Prevent flash of content before redirect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader />
      
      <Tabs defaultValue="owned" className="mt-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="owned">Owned NFTs</TabsTrigger>
          <TabsTrigger value="created">Created</TabsTrigger>
          <TabsTrigger value="favorited">Favorited</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="owned" className="mt-6">
          <OwnedNFTs />
        </TabsContent>
        
        <TabsContent value="created" className="mt-6">
          <CreatedNFTs />
        </TabsContent>
        
        <TabsContent value="favorited" className="mt-6">
          {favoriteNFTs.length > 0 ? (
            <OwnedNFTs nfts={favoriteNFTs} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No favorited NFTs yet</h3>
              <p className="text-muted-foreground">
                Browse the marketplace and add NFTs to your favorites.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="activity" className="mt-6">
          <ProfileActivity />
        </TabsContent>
      </Tabs>
    </div>
  );
}