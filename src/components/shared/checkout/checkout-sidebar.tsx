import { Button, Skeleton } from "@/components/ui"
import { PriceDetails } from "./price-details"
import { WhiteBlock } from "./white-block"
import { ArrowRight, Car, Package, Percent } from "lucide-react"

interface Props {
  DELIVERY_PRICE: number
  VAT: number
  totalAmount: number
  loading?: boolean
}

export const CheckoutSidebar: React.FC<Props> = ({ VAT, DELIVERY_PRICE, totalAmount, loading }) => {
  const deliveryPriceIsWithoutItems = !Boolean(totalAmount) ? 0 : DELIVERY_PRICE;
  const skeletonTotalPrice = <Skeleton className="h-[42px] w-40 bg-gray-100 rounded-[8px]" />;
  const skeleton = <Skeleton className="h-6 w-10 bg-gray-100 rounded-[8px]" />;

  const vat = !loading ? VAT + " ₽" : skeleton;
  const deliveryPrice = !loading ? deliveryPriceIsWithoutItems + " ₽" : skeleton;
  const totalAmountProducts = !loading ? totalAmount + " ₽" : skeleton;
  const totalPrice = !loading ? totalAmount + VAT + deliveryPriceIsWithoutItems + " ₽" : skeletonTotalPrice;

  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col">
        <span className="text-xl">Итого:</span>
        <span className="text-[30px] leading-[1.4] font-extrabold">{totalPrice}</span>
      </div>

      <PriceDetails title="Стоимость товаров:" value={totalAmountProducts} icon={<Package strokeWidth={1} size={20} />} />
      <PriceDetails title="Налоги:" value={vat} icon={<Percent strokeWidth={1} size={20} />} />
      <PriceDetails title="Доставка:" value={deliveryPrice} icon={<Car strokeWidth={1} size={20} />} />
      <Button loading={loading} type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  )
}