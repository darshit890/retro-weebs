import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import prisma from "@/lib/db";
import { redis } from "@/lib/redis";
import crypto from "crypto";
import axios from "axios";

export async function POST(req: Request) {
  console.log("Webhook received");
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature") as string;

  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET as string;
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    // if (generatedSignature !== signature) {
    //   console.error("Invalid signature");
    //   throw new Error("Invalid signature");
    // }
    console.log("Received signature:", signature);
    console.log("Generated signature:", generatedSignature);

    // console.log("Signature verified");
    const payload = JSON.parse(body);
    console.log("Webhook payload:", JSON.stringify(payload, null, 2));

    if (payload.event === 'payment.captured' || payload.event === 'order.paid') {
      console.log("Payment captured event received");
      const paymentId = payload.payload.payment.entity.id;
      const orderId = payload.payload.payment.entity.order_id;

      console.log(`Searching for order with Razorpay orderId: ${orderId}`);
      const order = await prisma.order.findFirst({
        where: { razorpayOrderId: orderId },
      });

      if (order) {
        console.log(`Order found: ${order.id}`);
        // Update order status using Axios
        const updateOrderUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/orders/${order.id}`;
        console.log(`Updating order status. URL: ${updateOrderUrl}`);
        try {
          const response = await axios.patch(updateOrderUrl, {
            status: "paid",
            razorpayPaymentId: paymentId,
          });
          console.log("Order update response:", response.data);
        } catch (error) {
          console.error("Error updating order:", error);
          if (axios.isAxiosError(error)) {
            console.error("Axios error details:", error.response?.data);
          }
        }

        // Clear the user's cart
        console.log(`Clearing cart for user: ${order.userId}`);
        await redis.del(`cart-${order.userId}`);
        console.log("Cart cleared");
      } else {
        console.log(`No order found for Razorpay orderId: ${orderId}`);
      }
    } else {
      console.log(`Unhandled event type: ${payload.event}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
  }
}
