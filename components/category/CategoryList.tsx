'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { fetchCategories } from '@/store/reducers/categoriesSlice';

export function CategoryList() {
  const dispatch = useAppDispatch();
  const { items: categories, loading: isLoading, sortBy, viewMode } = useAppSelector((state) => state.categories);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  
  const sortedCategories = [...categories].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical-asc':
        return a.name.localeCompare(b.name);
      case 'alphabetical-desc':
        return b.name.localeCompare(a.name);
      case 'items':
        return b.items - a.items;
      case 'volume':
        return b.volume - a.volume;
      case 'floor':
        return a.floorPrice - b.floorPrice;
      default: // 'recent'
        return b.id - a.id;
    }
  });
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-6 space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {sortedCategories.map((category) => (
          <motion.div
            key={category.id}
            variants={item}
            className="group border border-border rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-md transition-all duration-300"
          >
            <Link href={`/categories/${category.slug}`}>
              <div className="flex items-center p-4">
                <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                  <Image
                    src={category.logo}
                    alt={category.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-1">
                    {category.description}
                  </p>
                </div>
                
                <div className="ml-6 flex items-center space-x-8">
                  <div>
                    <p className="text-xs text-muted-foreground">Items</p>
                    <p className="text-sm font-medium">{category.items}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Floor</p>
                    <p className="text-sm font-medium">{category.floorPrice} ETH</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Volume</p>
                    <p className="text-sm font-medium">{category.volume} ETH</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {sortedCategories.map((category) => (
        <motion.div 
          key={category.id} 
          variants={item}
          className="group border border-border rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-md transition-all duration-300"
        >
          <Link href={`/categories/${category.slug}`}>
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={category.banner}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users size={14} className="mr-1" />
                  {category.items} items
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">
                {category.description}
              </p>
              
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Floor</p>
                  <p className="text-sm font-medium">{category.floorPrice} ETH</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Volume</p>
                  <p className="text-sm font-medium">{category.volume} ETH</p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}