"use client"

import { Dialog, DialogContent } from '@/components/ui/dialog'
import React from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ProductWithRelations } from '../../../../@types/prisma'
import { ProductForm } from '../product-form'

type Props = {
  className?: string
  product: ProductWithRelations
}

export const ChooseModalProduct: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[600px] bg-white overflow-hidden", className)}>
        <ProductForm product={product} router={() => router.back()} />
      </DialogContent>
    </Dialog>
  )
}