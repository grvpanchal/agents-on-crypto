'use client';

import { useState, useEffect } from 'react';
import { 
  Activity,
  ArrowDownUp,
  Tag,
  ShoppingCart,
  Clock,
  Share2 
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { useWeb3 } from '@/context/Web3Context';
import { formatAddress, formatDate } from '@/lib/utils';

export function ProfileActivity() {
  const { address } = useWeb3();
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to get user activity
    setTimeout(() => {
      const mockActivities = [
        {
          id: 1,
          type: 'Purchase',
          item: 'Cosmic Voyager #42',
          price: 0.85,
          from: '0x7896543210fedcba7896543210fedcba78965432',
          to: address || '0x1234567890abcdef1234567890abcdef12345678',
          date: new Date(2023, 5, 15).getTime(),
        },
        {
          id: 2,
          type: 'Listing',
          item: 'Digital Dreams #7',
          price: 1.2,
          from: address || '0x1234567890abcdef1234567890abcdef12345678',
          to: null,
          date: new Date(2023, 5, 10).getTime(),
        },
        {
          id: 3,
          type: 'Offer',
          item: 'Abstract Realms #18',
          price: 0.75,
          from: '0x3456789012abcdef3456789012abcdef34567890',
          to: address || '0x1234567890abcdef1234567890abcdef12345678',
          date: new Date(2023, 5, 8).getTime(),
        },
        {
          id: 4,
          type: 'Mint',
          item: 'Crystal Genesis #3',
          price: null,
          from: '0x0000000000000000000000000000000000000000',
          to: address || '0x1234567890abcdef1234567890abcdef12345678',
          date: new Date(2023, 5, 5).getTime(),
        },
        {
          id: 5,
          type: 'Sale',
          item: 'Ethereal Visions #11',
          price: 2.1,
          from: address || '0x1234567890abcdef1234567890abcdef12345678',
          to: '0x5678901234abcdef5678901234abcdef56789012',
          date: new Date(2023, 5, 1).getTime(),
        },
      ];
      
      setActivities(mockActivities);
      setIsLoading(false);
    }, 1500);
  }, [address]);
  
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'Purchase': return <ShoppingCart size={16} className="text-green-500" />;
      case 'Listing': return <Tag size={16} className="text-blue-500" />;
      case 'Offer': return <ArrowDownUp size={16} className="text-purple-500" />;
      case 'Sale': return <ShoppingCart size={16} className="text-amber-500" />;
      case 'Mint': return <Activity size={16} className="text-pink-500" />;
      case 'Transfer': return <Share2 size={16} className="text-indigo-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };
  
  if (isLoading) {
    return (
      <div className="w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full mb-2" />
        ))}
      </div>
    );
  }
  
  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No activity found</h3>
        <p className="text-muted-foreground">
          Your activity history will appear here once you start interacting with NFTs.
        </p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell className="font-medium flex items-center">
                <span className="mr-2">{getEventIcon(activity.type)}</span>
                {activity.type}
              </TableCell>
              <TableCell>{activity.item}</TableCell>
              <TableCell>
                {activity.price ? `${activity.price} ETH` : '--'}
              </TableCell>
              <TableCell>
                {activity.from ? formatAddress(activity.from) : '--'}
              </TableCell>
              <TableCell>
                {activity.to ? formatAddress(activity.to) : '--'}
              </TableCell>
              <TableCell className="text-right">
                {formatDate(activity.date)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}