import { CategoryList } from '@/components/category/CategoryList';
import { CategoryFilters } from '@/components/category/CategoryFilters';
import { CategoryHeader } from '@/components/category/CategoryHeader';

export const metadata = {
  title: 'Browse NFT Categories | NFT Nexus',
  description: 'Explore our wide range of NFT categories and collections',
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <CategoryFilters />
        </div>
        <div className="md:w-3/4">
          <CategoryList />
        </div>
      </div>
    </div>
  );
}