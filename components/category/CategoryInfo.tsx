'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  Share2,
  ChevronDown, 
  ChevronUp, 
  Users, 
  Wallet, 
  BarChart3, 
  Tag 
} from 'lucide-react';

interface CategoryInfoProps {
  category: any;
}

export function CategoryInfo({ category }: CategoryInfoProps) {
  const [showMore, setShowMore] = useState(false);
  
  return (
    <div>
      {/* Banner Image */}
      <div className="relative h-48 md:h-64 w-full rounded-xl overflow-hidden mb-6">
        <Image
          src={category.banner}
          alt={`${category.name} banner`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Category Logo */}
        <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-lg overflow-hidden border-4 border-background -mt-12 md:-mt-16 z-10 bg-muted">
          <Image
            src={category.logo}
            alt={`${category.name} logo`}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1">
          {/* Category Header */}
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold">{category.name}</h1>
              <div className="flex items-center mt-1">
                <p className="text-sm text-muted-foreground">Created by</p>
                <p className="text-sm font-medium ml-1">{category.creator}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" /> Share
              </Button>
              <Button size="sm">Follow</Button>
            </div>
          </div>
          
          {/* Description */}
          <div className="mt-4">
            <p className={`text-muted-foreground text-sm ${!showMore && 'line-clamp-2'}`}>
              {category.description || 'A collection of unique NFTs in the category of digital art, collectibles, music, and photography. Each piece is authenticated on the blockchain to ensure provenance and ownership.'}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-1 h-6 px-2"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" /> Show less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" /> Read more
                </>
              )}
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className="bg-card border border-border rounded-lg p-3">
              <div className="flex items-center text-muted-foreground mb-1">
                <Users size={14} className="mr-1" />
                <span className="text-xs">Owners</span>
              </div>
              <p className="font-semibold">{category.owners}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <div className="flex items-center text-muted-foreground mb-1">
                <Wallet size={14} className="mr-1" />
                <span className="text-xs">Items</span>
              </div>
              <p className="font-semibold">{category.items}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <div className="flex items-center text-muted-foreground mb-1">
                <Tag size={14} className="mr-1" />
                <span className="text-xs">Floor Price</span>
              </div>
              <p className="font-semibold">{category.floorPrice} ETH</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3">
              <div className="flex items-center text-muted-foreground mb-1">
                <BarChart3 size={14} className="mr-1" />
                <span className="text-xs">Volume</span>
              </div>
              <p className="font-semibold">{category.volume} ETH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}