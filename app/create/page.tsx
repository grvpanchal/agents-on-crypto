'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWeb3 } from '@/context/Web3Context';
import { useToast } from '@/hooks/use-toast';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Image as ImageIcon, 
  Upload, 
  AlertTriangle, 
  Info 
} from 'lucide-react';
import { mockCategories } from '@/lib/mockData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function CreatePage() {
  const { connected, connectWallet } = useWeb3();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  useEffect(() => {
    // Redirect if not connected after a delay
    let timeout: NodeJS.Timeout;
    if (!connected) {
      timeout = setTimeout(() => {
        router.push('/');
        toast({
          variant: 'destructive',
          title: 'Wallet connection required',
          description: 'Please connect your wallet to create NFTs',
        });
      }, 3000);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [connected, router, toast]);
  
  // Form schema
  const formSchema = z.object({
    name: z.string().min(3, {
      message: 'Name must be at least 3 characters',
    }).max(50, {
      message: 'Name must be less than 50 characters',
    }),
    description: z.string().max(500, {
      message: 'Description must be less than 500 characters',
    }).optional(),
    category: z.string({
      required_error: 'Please select a category',
    }),
    price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Price must be a positive number',
    }),
    royalties: z.string().refine((val) => {
      const num = Number(val);
      return !isNaN(num) && num >= 0 && num <= 15;
    }, {
      message: 'Royalties must be between 0% and 15%',
    }),
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      price: '',
      royalties: '5',
    },
  });
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Image must be less than 5MB',
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!imagePreview) {
      toast({
        variant: 'destructive',
        title: 'Image required',
        description: 'Please upload an image for your NFT',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate blockchain interaction for minting
    setTimeout(() => {
      toast({
        title: 'NFT Created!',
        description: 'Your NFT has been successfully minted',
      });
      setIsSubmitting(false);
      router.push('/profile');
    }, 2000);
  };
  
  if (!connected) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <AlertTriangle className="h-16 w-16 mx-auto mb-6 text-amber-500" />
        <h1 className="text-3xl font-bold mb-4">Wallet Connection Required</h1>
        <p className="text-muted-foreground mb-6">
          You need to connect your wallet to create NFTs.
        </p>
        <Button onClick={connectWallet}>Connect Wallet</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Create a New NFT</h1>
        <p className="text-muted-foreground mb-8">
          Create and mint your unique NFT to the blockchain
        </p>
        
        <div className="p-6 border border-border rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* NFT Image Upload */}
              <div className="space-y-2">
                <FormLabel>Upload File</FormLabel>
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-border rounded-lg overflow-hidden relative">
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      {/* eslint-disable-next-line */}
                      <img 
                        src={imagePreview} 
                        alt="NFT preview" 
                        className="object-contain w-full h-full"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setImagePreview(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <div className="flex flex-col items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Click or drag to upload</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG, GIF, SVG, MP4 or MP3. Max 5MB.
                        </p>
                      </div>
                      <Input
                        type="file"
                        className="hidden"
                        accept=".png,.jpg,.jpeg,.gif,.svg,.mp4,.mp3"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
              </div>
              
              <Separator />
              
              {/* NFT Details */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter NFT name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your NFT (optional)"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The description will be displayed on the NFT's detail page.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockCategories.map((category) => (
                          <SelectItem key={category.id} value={category.slug}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (ETH)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.001"
                          min="0.001"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="royalties"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Royalties (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          max="15"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Percentage of sales you'll receive when someone resells your NFT.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="bg-muted/60 p-4 rounded-lg flex items-start space-x-3 mb-4">
                <Info className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Before you mint</p>
                  <p className="text-muted-foreground">
                    Minting an NFT will require a gas fee for the blockchain transaction. Make sure you have enough ETH in your wallet to cover this cost.
                  </p>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                      <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating NFT...
                  </span>
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    Create NFT
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}