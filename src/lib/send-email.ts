import { ReactNode } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.API_KEY_RESEND);

export const sendEmail = async (to: string, subject: string, reactTemplate: ReactNode) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: to,
      subject: subject,
      react: reactTemplate,
    });

    if (error) {
      console.error(error);
      return;
    }

    return data;
  } catch (error) {
    console.error("Error sending email", error);
  }
}