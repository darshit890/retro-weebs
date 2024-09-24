import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function getUserOrders(userId: string) {
  const orders = await prisma.order.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      amount: true,
      createdAt: true,
      status: true,
      items: {
        select: {
          quantity: true,
          color: true,
          size: true,
          price: true,
          productId: true,
        },
      },
      address: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
}

export default async function OrderHistoryPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return <div>Please log in to view your order history.</div>;
  }

  const orders = await getUserOrders(user.id);

  console.log(orders);

  return (
    <Card className="max-w-4xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Your Order History</CardTitle>
        <CardDescription>View details of your past orders</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p>You haven&apos;t placed any orders yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("en-US").format(order.createdAt)}
                  </TableCell>
                  <TableCell>
                  {order.status === 'created' ? 'Failed' : order.status}
                  </TableCell>
                  <TableCell>
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.quantity}x {item.color} {item.size} (₹{item.price})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {order.address
                      ? `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.postalCode}, ${order.address.country}`
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    ₹{new Intl.NumberFormat("en-IN").format(order.amount / 100)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}