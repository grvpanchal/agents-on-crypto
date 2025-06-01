'use client';

import { Button } from '@/components/ui/button';
import { GridIcon, ListIcon } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setViewMode, type ViewMode } from '@/store/reducers/categoriesSlice';

export function CategoryHeader() {
  const dispatch = useAppDispatch();
  const { viewMode } = useAppSelector((state) => state.categories);

  const handleViewChange = (mode: ViewMode) => {
    dispatch(setViewMode(mode));
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Browse Categories</h1>
          <p className="text-muted-foreground max-w-2xl mt-2">
            Explore our diverse range of NFT categories. From digital art to music, collectibles, and more.
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'} 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => handleViewChange('grid')}
          >
            <GridIcon className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'} 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => handleViewChange('list')}
          >
            <ListIcon className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>
    </div>
  );
}