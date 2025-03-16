"use client"

import toast from "react-hot-toast";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { checkoutFormSchema, CheckoutFormValues } from "../../../../constants/checkout-form-schema";
import { useCart } from "../../../../hooks/use-cart";
import { Title } from "@/components/shared";
import { CheckoutAdressForm, CheckoutCart, CheckoutPersonalForm } from "@/components/shared/checkout";
import { CheckoutSidebar } from "@/components/shared/checkout/checkout-sidebar";
import { cn } from "@/lib/utils";
import { createOrder } from "../../../../actions";
import { useSession } from "next-auth/react";
import ApiClient from "../../../../services/api-client";

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const { totalAmount, items, removeCartItem, updateItemQuantity, loading } = useCart();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: ""
    }
  });

  const VAT = Math.floor(totalAmount * 0.1);
  const DELIVERY_PRICE = Math.floor(totalAmount * 0.1 + 30);

  const updateQuantity = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);

    if (type === "minus") {
      setTimeout(() => {
        toast.success("Количество товара было успешно уменьшено");
      }, 3600);
    } else {
      setTimeout(() => {
        toast.success("Количество товара было успешно увеличено");
      }, 3600);
    }
  }

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toast.success("Успешное оформление заказа. Переходим к оплате...")

      if (url) {
        setTimeout(() => {
          location.href = url
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Не удалось оформить заказ")
      setSubmitting(false);
    }
  }

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await ApiClient.auth.getMe();
      const [firstName, lastName] = session!.user.name.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    fetchUserInfo();
  }, [session]);

  return (
    <div className="mt-12">
      <Title text={"Оформление заказа"} className="font-extrabold mb-8 text-[36px]" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-10 justify-between">
          <div className="flex flex-1 flex-col gap-y-10 mb-20">
            <CheckoutCart items={items} loading={loading} updateQuantity={updateQuantity} removeCartItem={removeCartItem} />
            <CheckoutPersonalForm className={cn({ "opacity-40 pointer-events-none": loading || submitting })} />
            <CheckoutAdressForm className={cn({ "opacity-40 pointer-events-none": loading || submitting })} />
          </div>
          <div className="w-[450px]">
            <CheckoutSidebar VAT={VAT} DELIVERY_PRICE={DELIVERY_PRICE} totalAmount={totalAmount} loading={loading || submitting} />
          </div>
        </form>
      </FormProvider>
    </div>
  )
}