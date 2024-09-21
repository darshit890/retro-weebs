import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 px-4 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Cancellation and Return Policy</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Cancellation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            To cancel an order before it ships, please email us at{" "}
            <a href="mailto:support@retroweebs.com" className="text-blue-600 hover:underline">
              support@retroweebs.com
            </a>{" "}
            or raise a ticket through our help center. Make sure to include your order number in the email.
          </p>
          <p className="mb-4">
            Please note that a cancellation fee of Rs. 40 applies to all orders.
          </p>
          <p className="font-semibold">
            Orders cannot be canceled once they have been shipped.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Return Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            At RetroWeebs, we accept returns and exchanges within seven days of delivery. Returns and exchanges are free of charge, with the following exceptions:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Essentials such as face masks and protective gear are not eligible for returns.</li>
            <li>Items sold at heavily discounted prices are non-refundable.</li>
            <li>For sale items, only the amount paid by the customer will be refunded, not the current sale price.</li>
            <li>Items that are worn, washed, or soiled may not be accepted for return.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Refunds</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            Refunds for prepaid orders will be processed within 7–10 business days.
          </p>
          <p>
            For cash on delivery (COD) orders, refunds will be initiated to the bank account provided during the return process.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}