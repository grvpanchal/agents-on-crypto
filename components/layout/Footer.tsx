'use client';

import Link from 'next/link';
import { Twitter, Instagram, Disc as Discord, Github, Bot } from 'lucide-react';
import { useAppSelector } from '@/hooks/useAppSelector';

export function Footer() {
  const { socialLinks } = useAppSelector((state) => state.footer);

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6" />
              <h3 className="text-lg font-bold">Agents on Crypto</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover, collect, and trade AI agents on the world's first blockchain-based AI agent marketplace.
            </p>
            <div className="flex space-x-4">
              <a href={socialLinks.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href={socialLinks.instagram} className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href={socialLinks.discord} className="text-muted-foreground hover:text-primary transition-colors">
                <Discord size={20} />
                <span className="sr-only">Discord</span>
              </a>
              <a href={socialLinks.github} className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
                <span className="sr-only">Github</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Marketplace</h3>
            <ul className="space-y-3">
              <li><Link href="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Agents</Link></li>
              <li><Link href="/categories/art" className="text-sm text-muted-foreground hover:text-primary transition-colors">Creative Agents</Link></li>
              <li><Link href="/categories/collectibles" className="text-sm text-muted-foreground hover:text-primary transition-colors">Task Agents</Link></li>
              <li><Link href="/categories/music" className="text-sm text-muted-foreground hover:text-primary transition-colors">Analysis Agents</Link></li>
              <li><Link href="/categories/photography" className="text-sm text-muted-foreground hover:text-primary transition-colors">Assistant Agents</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">My Account</h3>
            <ul className="space-y-3">
              <li><Link href="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">Profile</Link></li>
              <li><Link href="/profile/favorites" className="text-sm text-muted-foreground hover:text-primary transition-colors">Favorites</Link></li>
              <li><Link href="/profile/agents" className="text-sm text-muted-foreground hover:text-primary transition-colors">My Agents</Link></li>
              <li><Link href="/create" className="text-sm text-muted-foreground hover:text-primary transition-colors">Create Agent</Link></li>
              <li><Link href="/settings" className="text-sm text-muted-foreground hover:text-primary transition-colors">Settings</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/platform-status" className="text-sm text-muted-foreground hover:text-primary transition-colors">Platform Status</Link></li>
              <li><Link href="/partners" className="text-sm text-muted-foreground hover:text-primary transition-colors">Partners</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/newsletter" className="text-sm text-muted-foreground hover:text-primary transition-colors">Newsletter</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} Agents on Crypto. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}