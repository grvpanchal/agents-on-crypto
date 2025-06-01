'use client';

import { motion } from 'framer-motion';
import { Wallet, ShoppingBag, Paintbrush, BarChart4 } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Wallet,
      title: 'Connect Your Wallet',
      description: 'Connect your MetaMask wallet to get started with buying, selling, and creating NFTs.',
    },
    {
      icon: Paintbrush,
      title: 'Create Your NFT',
      description: 'Upload your work, add a title, description, and set a price to create your NFT.',
    },
    {
      icon: ShoppingBag,
      title: 'Buy & Sell NFTs',
      description: 'Browse the marketplace, make offers, and build your digital collection.',
    },
    {
      icon: BarChart4,
      title: 'Track Performance',
      description: 'Monitor the performance of your NFTs and collections in real-time.',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">
            Getting started with NFTs is easy. Follow these simple steps to begin your journey in the world of digital collectibles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 hover:shadow-md transition-all duration-300"
            >
              <div className="bg-primary/10 rounded-full p-4 mx-auto mb-6 w-16 h-16 flex items-center justify-center">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="relative mt-20 p-8 md:p-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your NFT Journey?</h3>
              <p className="text-muted-foreground mb-0">
                Connect your wallet now and dive into the world of digital collectibles, art, and more.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="#" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none">
                  Connect Wallet
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="/categories" className="inline-flex items-center justify-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-transparent hover:bg-primary/10 focus:outline-none">
                  Explore NFTs
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}