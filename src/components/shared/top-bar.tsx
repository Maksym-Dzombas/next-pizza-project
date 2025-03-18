import { cn } from '@/lib/utils'
import React from 'react'
import { Categories } from './categories'
import { Container } from './container'
import { Category } from '@prisma/client'

type Props = {
  categoryNames: Category[]
  className?: string
}

export const TopBar: React.FC<Props> = ({ categoryNames, className }) => {
  return (
    <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
      <Container className='flex items-center justify-between'>
        <Categories categoryNames={categoryNames} />
      </Container>
    </div>
  )
}