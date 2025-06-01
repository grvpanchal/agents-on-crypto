'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, RefreshCw } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setSortBy, type SortOption } from '@/store/reducers/categoriesSlice';

export function CategoryFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();
  const { sortBy } = useAppSelector((state) => state.categories);
  
  const handleSort = (option: SortOption) => {
    dispatch(setSortBy(option));
  };
  
  return (
    <div className="space-y-6 border border-border rounded-lg p-4 sticky top-20">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Sort By</h3>
        <div className="space-y-2">
          <Button 
            variant={sortBy === 'recent' ? 'outline' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => handleSort('recent')}
          >
            Recently Added
          </Button>
          <Button 
            variant={sortBy === 'alphabetical-asc' ? 'outline' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => handleSort('alphabetical-asc')}
          >
            Alphabetical (A-Z)
          </Button>
          <Button 
            variant={sortBy === 'alphabetical-desc' ? 'outline' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => handleSort('alphabetical-desc')}
          >
            Alphabetical (Z-A)
          </Button>
          <Button 
            variant={sortBy === 'items' ? 'outline' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => handleSort('items')}
          >
            Most Items
          </Button>
          <Button 
            variant={sortBy === 'volume' ? 'outline' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => handleSort('volume')}
          >
            Highest Volume
          </Button>
          <Button 
            variant={sortBy === 'floor' ? 'outline' : 'ghost'} 
            className="w-full justify-start"
            onClick={() => handleSort('floor')}
          >
            Lowest Floor Price
          </Button>
        </div>
      </div>
      
      <div className="pt-2">
        <Button variant="outline" className="w-full" size="sm" onClick={() => handleSort('recent')}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}