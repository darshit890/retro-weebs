import { NextResponse } from 'next/server';
import prisma from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log('Order update API called');
  try {
    const { id } = params;
    console.log(`Updating order: ${id}`);
    const body = await req.json();
    console.log('Update data:', body);
    const { status, razorpayPaymentId } = body;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status, razorpayPaymentId },
    });

    console.log('Order updated successfully:', updatedOrder);
    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}