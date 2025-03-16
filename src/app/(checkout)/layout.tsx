import { Container } from "@/components/shared/container"
import { Header } from "@/components/shared/header"
import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Next Pizza | Checkout",
  description: "Placing an order"
}

const CheckoutLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen bg-[#f4f1ee]">
      <Container>
        <Header hasCart={false} hasSearch={false} className="border-b border-b-gray-2" />
        {children}
      </Container>
    </main>
  )
}

export default CheckoutLayout;