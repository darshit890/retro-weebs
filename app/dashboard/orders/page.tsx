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

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      status: true,
      id: true,
      User: {
        select: {
          firstName: true,
          email: true,
          profileImage: true,
        },
      },
      items: {
        select: {
          quantity: true,
          color: true,
          size: true,
          product: {  // Added product relation
            select: {
              name: true,
              images: true,
            },
          },
        },
      },
      address: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function OrdersPage() {
  const data = await getData();

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store!</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Product Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p className="font-medium">{item.User?.firstName}</p>
                  <p className="hidden md:flex text-sm text-muted-foreground">
                    {item.User?.email}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    {item.items.map((orderItem, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {orderItem.product?.images[0] && (
                          <img
                            src={orderItem.product.images[0]}
                            alt={orderItem.product?.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        )}
                        <span className="text-sm">{orderItem.product?.name}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {item.status === 'created' ? 'Failed' : item.status}
                </TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-US").format(item.createdAt)}
                </TableCell>
                <TableCell>{item.items.reduce((sum, i) => sum + i.quantity, 0)}</TableCell>
                <TableCell>{item.items.map(i => i.color).join(", ")}</TableCell>
                <TableCell>{item.items.map(i => i.size).join(", ")}</TableCell>
                <TableCell>
                  {item.address ? `${item.address.street}, ${item.address.city}, ${item.address.state}, ${item.address.postalCode}, ${item.address.country}` : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  ₹{new Intl.NumberFormat("en-IN").format(item.amount / 100)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}