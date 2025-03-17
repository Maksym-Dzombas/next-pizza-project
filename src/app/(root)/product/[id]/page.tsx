import { Container } from '@/components/shared/container'
import { ProductForm } from '@/components/shared/product-form'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

const ProductPage = async ({ params }: Props) => {
  const { id } = await params;
  const product = await prisma.product.findFirst({ where: { id: Number(id) }, include: { ingredients: true, variations: true } });

  if (!product) notFound();

  return (
    <Container className="flex my-10 justify-between">
      <ProductForm isProductPage={true} product={product} />
    </Container>
  )
}

export default ProductPage;