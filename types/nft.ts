export interface NFTType {
  id: number;
  name: string;
  tokenId: string;
  image: string;
  description?: string;
  price: number;
  highestBid?: number;
  creator: string;
  creatorAddress?: string;
  creatorImage: string;
  owner?: string;
  ownerAddress?: string;
  contractAddress?: string;
  likes: number;
  views: number;
  category: string;
  verified: boolean;
}

export interface CollectionType {
  id: number;
  name: string;
  slug: string;
  description: string;
  creator: string;
  creatorAddress: string;
  logo: string;
  banner: string;
  items: number;
  owners: number;
  floorPrice: number;
  volume: number;
  category: string;
  verified: boolean;
}

export interface CategoryType {
  id: number;
  name: string;
  slug: string;
  description: string;
  banner: string;
  logo: string;
  items: number;
  floorPrice: number;
  volume: number;
}