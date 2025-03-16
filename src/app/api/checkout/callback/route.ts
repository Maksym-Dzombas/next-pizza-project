import { prisma } from "@/prisma/prisma-client";
import { PaymentCallbackData } from "../../../../../@types/yookassa";
import { OrderStatus } from "@prisma/client";
import { CartItemDTO } from "../../../../../services/dto/cart.dto";
import { sendEmail } from "@/lib/send-email";
import { OrderSuccessEmail } from "@/components/shared/email-templates/order-success";
import { OrderCancelEmail } from "@/components/shared/email-templates/order-cancel";

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json() as PaymentCallbackData;
    const orderId = Number(body.object.metadata.order_id);

    const order = await prisma.order.findFirst({
      where: {
        id: orderId
      },
      include: {
        user: true
      }
    });

    const totalAmount = order!.totalAmount;

    if (!order) {
      return new Response("Order not found", { status: 404 });
    }

    const isSuccessful = body.object.status === "succeeded";
    await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        status: isSuccessful ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED
      }
    });

    const items = order.items as unknown as CartItemDTO[];

    if (isSuccessful) {
      await sendEmail(order.email, "Next Pizza / Ваш заказ успешно оформлен", await OrderSuccessEmail({ orderId, totalAmount, items }));
      return new Response("Order success", { status: 200 });
    } else {
      await sendEmail(order.email, "Next Pizza / Ваш заказ был отменен", await OrderCancelEmail({ orderId, items }));
      return new Response("Order cancelled", { status: 200 });
    }
  } catch (error) {
    console.log("[CheckoutCallback] Error: ", error);
    return new Response("Error", { status: 500 });
  }
}