import { prisma } from '@/lib/prisma'
import { NFTPage } from '@/components/nft/NFTPage';

export async function generateStaticParams() {
  const nfts = await prisma.nft.findMany({ select: { id: true } })
  return nfts.map((nft) => ({ id: nft.id.toString() }))
}

export default function Page({ params }: { params: { id: string } }) {
  return <NFTPage params={params} />;
}