import { HeroSection } from '@/components/home/HeroSection';
import { TrendingNFTs } from '@/components/home/TrendingNFTs';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Newsletter } from '@/components/home/Newsletter';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <TrendingNFTs />
      <FeaturedCollections />
      <HowItWorks />
      <Newsletter />
    </div>
  );
}