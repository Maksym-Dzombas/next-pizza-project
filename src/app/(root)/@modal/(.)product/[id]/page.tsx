import { ChooseModalProduct } from "@/components/shared/modal/choose-modal-product";
import { prisma } from "@/prisma/prisma-client";
import React from "react";

export default async function ProductModalPage({ params }: { params: { id: string } }) {
  const { id } = await params || { id: 0 };

  if (id) {
    try {
      const product = await prisma.product.findFirst({
        where: { id: Number(id) }, include: {
          variations: true,
          ingredients: true
        }
      });

      if (product) return <ChooseModalProduct product={product} />
    } catch (error) {
      console.error("[RENDER MODAL PRODUCT] error: ", error);
      return <div>Ошибка при получении продукта!</div>
    }
  } else {
    return <div className="w-full bg-slate-700">Загрузка...</div>
  }
}