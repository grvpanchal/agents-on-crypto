import { mockNFTs } from '@/lib/mockData';
import { NFTPage } from '@/components/nft/NFTPage';

export function generateStaticParams() {
  return mockNFTs.map((nft) => ({
    id: nft.id.toString(),
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <NFTPage params={params} />;
}