import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import prisma from "@/lib/db";
import { redis } from "@/lib/redis";
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      throw new Error('No Razorpay signature found');
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      throw new Error('Razorpay webhook secret is not configured');
    }

    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    if (generatedSignature !== signature) {
      throw new Error('Invalid signature');
    }

    const payload = JSON.parse(rawBody);

    if (payload.event === 'payment.captured') {
      const { id: paymentId, order_id: orderId } = payload.payload.payment.entity;

      const order = await prisma.order.findFirst({
        where: { razorpayOrderId: orderId },
      });

      if (!order) {
        throw new Error(`No matching order found for Razorpay order ID: ${orderId}`);
      }

      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'paid',
          razorpayPaymentId: paymentId,
        },
      });

      await redis.del(`cart-${order.userId}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    );
  }
}