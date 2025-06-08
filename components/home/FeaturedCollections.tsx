'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ChevronRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FeaturedCollections() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [collections, setCollections] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/collections')
      .then(res => res.json())
      .then(setCollections)
      .catch(() => setCollections([]))
  }, [])
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Collections</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore curated collections from the most talented artists and creators in the NFT space.
            </p>
          </div>
          <Button variant="ghost" asChild className="mt-4 md:mt-0">
            <Link href="/collections">
              All collections <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {collections.slice(0, 3).map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
            >
              <Link href={`/collections/${collection.slug}`}>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={collection.banner}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative h-16 w-16 overflow-hidden border-4 border-background rounded-full -mt-14">
                      <Image
                        src={collection.logo}
                        alt={`${collection.name} logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users size={14} className="mr-1" />
                      {collection.owners} owners
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    by <span className="text-foreground">{collection.creator}</span>
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Floor Price</p>
                      <p className="text-sm font-medium">{collection.floorPrice} ETH</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Volume</p>
                      <p className="text-sm font-medium">{collection.volume} ETH</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Items</p>
                      <p className="text-sm font-medium">{collection.items}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}