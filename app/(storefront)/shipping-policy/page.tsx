import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ShippingPolicy() {
  return (
    <div className="mx-auto sm:px-6 px-4 lg:px-8 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-center mb-8">Shipping & Cancellation Policy</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Shipping Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <PolicySection title="Processing Time">
            <p>All orders are processed within 1-3 business days. Orders are not shipped or delivered on weekends or holidays.</p>
          </PolicySection>

          <PolicySection title="Shipping Methods & Delivery Estimates">
            <ul className="list-disc list-inside">
              <li>Standard Shipping: 5-7 business days</li>
            </ul>
          </PolicySection>

          <PolicySection title="Shipping Costs">
            <p>Shipping cost is included in price</p>
          </PolicySection>

          <PolicySection title="Delivery Area">
            <p>We currently only ship within India. We do not offer international shipping at this time.</p>
          </PolicySection>

          <PolicySection title="Lost or Damaged Packages">
            <p>We are not responsible for lost or damaged packages once they have been handed over to the shipping carrier. However, we will assist you in filing a claim with the carrier if such an event occurs.</p>
          </PolicySection>
        </CardContent>
      </Card>
    </div>
  )
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <div className="text-muted-foreground">{children}</div>
      <Separator className="mt-4" />
    </div>
  )
}