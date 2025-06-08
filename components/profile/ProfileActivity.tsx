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
import { formatAddress, formatDate } from '@/lib/utils';

export function ProfileActivity() {
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/activities')
      .then(res => res.json())
      .then(data => {
        setActivities(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])
  
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
                {activity.fromAddress ? formatAddress(activity.fromAddress) : '--'}
              </TableCell>
              <TableCell>
                {activity.toAddress ? formatAddress(activity.toAddress) : '--'}
              </TableCell>
              <TableCell className="text-right">
                {formatDate(new Date(activity.date).getTime())}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}