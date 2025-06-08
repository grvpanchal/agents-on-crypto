import { prisma } from '@/lib/prisma'
import { CategoryPage } from '@/components/category/CategoryPage';

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({ select: { slug: true } })
  return categories.map((category) => ({ slug: category.slug }))
}

export default function Page({ params }: { params: { slug: string } }) {
  return <CategoryPage params={params} />;
}