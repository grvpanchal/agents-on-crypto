'use client';

import { useEffect } from 'react';
import { CategoryInfo } from '@/components/category/CategoryInfo';
import { NFTFilters } from '@/components/nft/NFTFilters';
import { NFTGrid } from '@/components/nft/NFTGrid';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchCategories } from '@/store/reducers/categoriesSlice';
import { fetchNFTs } from '@/store/reducers/nftSlice';

export function CategoryPage({ params }: { params: { slug: string } }) {
  const dispatch = useAppDispatch();
  const { items: categories, loading: categoriesLoading } = useAppSelector((state) => state.categories);
  const { items: nfts, loading: nftsLoading, filters } = useAppSelector((state) => state.nft);
  
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchNFTs());
  }, [dispatch]);

  const category = categories.find((c) => c.slug === params.slug);
  
  const filteredNFTs = nfts
    .filter((nft) => nft.category === params.slug)
    .filter((nft) => {
      // Apply price filter
      if (nft.price < filters.priceRange[0] || nft.price > filters.priceRange[1]) {
        return false;
      }
      
      // Apply collection filter
      if (filters.collections.length > 0 && !filters.collections.includes(nft.creator)) {
        return false;
      }
      
      // Apply property filter (simplified for demo)
      if (filters.properties.length > 0) {
        // In a real app, you would check the NFT's properties
        // For now, we'll just filter if any property is selected
        return false;
      }
      
      return true;
    });

  if (categoriesLoading || nftsLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-64 bg-muted rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="text-muted-foreground">
          The category you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryInfo category={category} />
      
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="lg:w-1/4">
          <NFTFilters />
        </div>
        <div className="lg:w-3/4">
          <NFTGrid nfts={filteredNFTs} />
        </div>
      </div>
    </div>
  );
}