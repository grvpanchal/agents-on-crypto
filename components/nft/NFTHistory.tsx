'use client';

import { useState, useEffect } from 'react';
import { NFTType } from '@/types/nft';
import { 
  Activity,
  ArrowDownUp,
  Tag,
  ShoppingCart,
  Clock,
  Share2 
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatAddress, formatDate } from '@/lib/utils';

interface NFTHistoryProps {
  nft: NFTType;
}

export function NFTHistory({ nft }: NFTHistoryProps) {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading history data from an API
    setTimeout(() => {
      const mockHistory = [
        {
          id: 1,
          type: 'Minted',
          from: '0x0000000000000000000000000000000000000000',
          to: nft.creatorAddress || '0x1234567890abcdef1234567890abcdef12345678',
          price: null,
          date: new Date(2023, 1, 15).getTime(),
        },
        {
          id: 2,
          type: 'Listed',
          from: nft.creatorAddress || '0x1234567890abcdef1234567890abcdef12345678',
          to: null,
          price: nft.price * 0.9,
          date: new Date(2023, 2, 10).getTime(),
        },
        {
          id: 3,
          type: 'Offer',
          from: '0x7896543210fedcba7896543210fedcba78965432',
          to: null,
          price: nft.price * 0.8,
          date: new Date(2023, 2, 20).getTime(),
        },
        {
          id: 4,
          type: 'Transfer',
          from: nft.creatorAddress || '0x1234567890abcdef1234567890abcdef12345678',
          to: '0x3456789012abcdef3456789012abcdef34567890',
          price: null,
          date: new Date(2023, 3, 5).getTime(),
        },
        {
          id: 5,
          type: 'Sale',
          from: '0x3456789012abcdef3456789012abcdef34567890',
          to: nft.ownerAddress || '0x5678901234abcdef5678901234abcdef56789012',
          price: nft.price * 0.95,
          date: new Date(2023, 3, 15).getTime(),
        },
        {
          id: 6,
          type: 'Listed',
          from: nft.ownerAddress || '0x5678901234abcdef5678901234abcdef56789012',
          to: null,
          price: nft.price,
          date: new Date(2023, 4, 1).getTime(),
        },
      ];
      
      setHistoryData(mockHistory);
      setIsLoading(false);
    }, 1000);
  }, [nft]);
  
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'Minted': return <Activity size={16} className="text-green-500" />;
      case 'Listed': return <Tag size={16} className="text-blue-500" />;
      case 'Offer': return <ArrowDownUp size={16} className="text-purple-500" />;
      case 'Sale': return <ShoppingCart size={16} className="text-amber-500" />;
      case 'Transfer': return <Share2 size={16} className="text-pink-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };
  
  return (
    <div className="mt-8 border border-border rounded-lg overflow-hidden">
      <Tabs defaultValue="history">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <TabsList>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
          </TabsList>
          
          <Select defaultValue="recent">
            <SelectTrigger className="w-32 h-8">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="price-high">Highest Price</SelectItem>
              <SelectItem value="price-low">Lowest Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <TabsContent value="history" className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={5}>
                        <div className="h-10 bg-muted animate-pulse rounded"></div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  historyData.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium flex items-center">
                        <span className="mr-2">{getEventIcon(event.type)}</span>
                        {event.type}
                      </TableCell>
                      <TableCell>
                        {event.price ? `${event.price} ETH` : '--'}
                      </TableCell>
                      <TableCell>
                        {event.from ? formatAddress(event.from) : '--'}
                      </TableCell>
                      <TableCell>
                        {event.to ? formatAddress(event.to) : '--'}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatDate(event.date)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
                
                {!isLoading && historyData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No events found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="listings" className="p-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No active listings</p>
          </div>
        </TabsContent>
        
        <TabsContent value="offers" className="p-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No active offers</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}