import { Loader } from "lucide-react"
import { StateCartItem } from "../../../../store/cart"
import { CheckoutProductItem } from "./checkout-product-item"
import { WhiteBlock } from "./white-block"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui"

interface Props {
  items: StateCartItem[]
  loading?: boolean
  contentClassName?: string
  className?: string
  updateQuantity: (id: number, quantity: number, type: "plus" | "minus") => void
  removeCartItem: (id: number) => void
}

export const CheckoutCart: React.FC<Props> = ({ items, loading, updateQuantity, removeCartItem, contentClassName, className }) => {
  return (
    <WhiteBlock className="max-h-[45%]" contentClassName="flex flex-col gap-5 overflow-y-scroll overflow-x-hidden max-h-[87%]" title="1. Корзина">
      {items.length > 0 ? items.map(item => (
        <CheckoutProductItem key={item.id} id={1}
          imageUrl={item.imageUrl}
          details={item.ingredients!.map(ingredientObject => ingredientObject.name).join(", ")} name={item.name}
          price={item.price}
          quantity={item.quantity}
          disabled={item.disabled}
          onClickCountButton={(type) => {
            updateQuantity(item.id, item.quantity, type);
          }}
          onClickRemove={() => removeCartItem(item.id)}
          className={cn({ "pointer-events-none": item.disabled })}
        />
      )) : loading ? (
        <div className="flex p-[62px] justify-center items-center gap-3">
          <p className="text-lg text-gray-500">
            Загрузка данных из корзины
          </p>
          <Loader className={cn("text-gray-500", { "animate-spin": loading })} />
        </div>
      ) : (
        <div className="flex flex-col items-center p-10 gap-2">
          <p className="text-lg text-gray-500">Ваша корзина пуста</p>
          <Link href={"/"}>
            <Button className="text-sm" size={"sm"}>
              Перейти к покупкам
            </Button>
          </Link>
        </div>
      )}
    </WhiteBlock>
  )
}