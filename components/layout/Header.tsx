'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Bot, User, Heart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWeb3 } from '@/context/Web3Context';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { toggleMobileMenu, setSearchQuery } from '@/store/reducers/headerSlice';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { connected } = useWeb3();
  const dispatch = useAppDispatch();
  const { isMobileMenuOpen, searchQuery } = useAppSelector((state) => state.header);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
    { name: 'Create', href: '/create' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleMobileMenuToggle = () => {
    dispatch(toggleMobileMenu());
  };

  return (
    <header className={cn(
      'w-full border-b border-border bg-background',
      isScrolled && 'shadow-sm'
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Bot className="h-6 w-6" />
              <span className="text-2xl font-bold tracking-tight">Agents on Crypto</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative w-60">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                className="pl-8 h-9 bg-muted/50 border-none"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <WalletConnect />
            {connected && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Open profile menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/agents">
                      <Bot className="mr-2 h-4 w-4" />
                      My Agents
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/favorites">
                      <Heart className="mr-2 h-4 w-4" />
                      Favorites
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                className="pl-8 bg-muted/50 border-none w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                    pathname === link.href
                      ? "bg-muted text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={handleMobileMenuToggle}
                >
                  {link.name}
                </Link>
              ))}
              {connected && (
                <>
                  <Link
                    href="/profile"
                    className="text-sm font-medium p-2 rounded-md text-muted-foreground hover:text-primary"
                    onClick={handleMobileMenuToggle}
                  >
                    <User className="h-4 w-4 inline mr-2" />
                    Profile
                  </Link>
                  <Link
                    href="/profile/agents"
                    className="text-sm font-medium p-2 rounded-md text-muted-foreground hover:text-primary"
                    onClick={handleMobileMenuToggle}
                  >
                    <Bot className="h-4 w-4 inline mr-2" />
                    My Agents
                  </Link>
                  <Link
                    href="/profile/favorites"
                    className="text-sm font-medium p-2 rounded-md text-muted-foreground hover:text-primary"
                    onClick={handleMobileMenuToggle}
                  >
                    <Heart className="h-4 w-4 inline mr-2" />
                    Favorites
                  </Link>
                  <Link
                    href="/settings"
                    className="text-sm font-medium p-2 rounded-md text-muted-foreground hover:text-primary"
                    onClick={handleMobileMenuToggle}
                  >
                    <Settings className="h-4 w-4 inline mr-2" />
                    Settings
                  </Link>
                </>
              )}
              <div className="pt-2">
                <WalletConnect isMobile={true} />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}