'use client';

import { useState } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import {
  Slider
} from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  setPriceRange,
  toggleCollection,
  toggleProperty,
  resetFilters,
} from '@/store/reducers/nftSlice';

export function NFTFilters() {
  const dispatch = useAppDispatch();
  const { priceRange, collections: selectedCollections, properties: selectedProperties } = useAppSelector((state) => state.nft.filters);
  
  const collections = [
    'CryptoPunks',
    'Bored Ape Yacht Club',
    'Art Blocks',
    'Doodles',
    'World of Women'
  ];
  
  const properties = [
    'Background',
    'Eyes',
    'Mouth',
    'Clothing',
    'Accessories'
  ];
  
  const handlePriceRangeChange = (value: number[]) => {
    dispatch(setPriceRange(value as [number, number]));
  };
  
  const handleCollectionChange = (collection: string) => {
    dispatch(toggleCollection(collection));
  };
  
  const handlePropertyChange = (property: string) => {
    dispatch(toggleProperty(property));
  };
  
  const handleResetFilters = () => {
    dispatch(resetFilters());
  };
  
  return (
    <div className="space-y-6 border border-border rounded-lg p-4 sticky top-20">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {(selectedCollections.length > 0 || selectedProperties.length > 0 || priceRange[0] > 0 || priceRange[1] < 10) && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleResetFilters}
            className="h-8 text-xs"
          >
            <X size={14} className="mr-1" /> Clear All
          </Button>
        )}
      </div>
      
      <Accordion type="multiple" defaultValue={['price', 'collections', 'properties']}>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                min={0}
                max={10}
                step={0.1}
                onValueChange={handlePriceRangeChange}
              />
              
              <div className="flex items-center justify-between">
                <div className="w-[45%]">
                  <p className="text-xs text-muted-foreground mb-1">Min (ETH)</p>
                  <Input
                    type="number"
                    value={priceRange[0]}
                    min={0}
                    max={priceRange[1]}
                    step={0.1}
                    onChange={(e) => handlePriceRangeChange([parseFloat(e.target.value), priceRange[1]])}
                  />
                </div>
                <div className="w-[10%] text-center">
                  <span className="text-muted-foreground">to</span>
                </div>
                <div className="w-[45%]">
                  <p className="text-xs text-muted-foreground mb-1">Max (ETH)</p>
                  <Input
                    type="number"
                    value={priceRange[1]}
                    min={priceRange[0]}
                    max={10}
                    step={0.1}
                    onChange={(e) => handlePriceRangeChange([priceRange[0], parseFloat(e.target.value)])}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="collections">
          <AccordionTrigger>Collections</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {collections.map((collection) => (
                <div key={collection} className="flex items-center space-x-2">
                  <Checkbox
                    id={`collection-${collection}`}
                    checked={selectedCollections.includes(collection)}
                    onCheckedChange={() => handleCollectionChange(collection)}
                  />
                  <label
                    htmlFor={`collection-${collection}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {collection}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="properties">
          <AccordionTrigger>Properties</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {properties.map((property) => (
                <div key={property} className="flex items-center space-x-2">
                  <Checkbox
                    id={`property-${property}`}
                    checked={selectedProperties.includes(property)}
                    onCheckedChange={() => handlePropertyChange(property)}
                  />
                  <label
                    htmlFor={`property-${property}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {property}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}