import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { clothingItems, getClothingItem } from '@/data/clothing'
import { ClothingDetailView } from '@/components/clothing/ClothingDetailView'

interface ClothingDetailPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return clothingItems.map((item) => ({ slug: item.slug }))
}

export function generateMetadata({ params }: ClothingDetailPageProps): Metadata {
  const item = getClothingItem(params.slug)
  if (!item) {
    return { title: 'Not Found' }
  }
  return {
    title: item.name,
    description: item.teaser,
  }
}

export default function ClothingDetailPage({ params }: ClothingDetailPageProps) {
  const item = getClothingItem(params.slug)
  if (!item) {
    notFound()
  }
  return <ClothingDetailView item={item} />
}
