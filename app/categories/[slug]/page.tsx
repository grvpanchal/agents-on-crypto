import { mockCategories } from '@/lib/mockData';
import { CategoryPage } from '@/components/category/CategoryPage';

export function generateStaticParams() {
  return mockCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <CategoryPage params={params} />;
}