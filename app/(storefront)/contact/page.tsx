import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Twitter, ChevronDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-2">Contact Us</h1>
      <p className="text-center text-muted-foreground mb-8">We&apos;re here to help and answer any question you might have</p>
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="text-2xl">Otaku Treasures</CardTitle>
            <p className="text-sm">Your Ultimate Anime Merchandise Store in India</p>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>contact@retroweebs.com</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Business Hours</h2>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Monday - Saturday: 10:00 AM - 6:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>For faster response, please email us with your order number (if applicable).</p>
              <p>We typically respond within 24 hours during business days.</p>
              <p>For urgent matters, please call our customer support number.</p>
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4 text-left max-w-2xl mx-auto">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>What payment methods do you accept?</span>
                <span className="transition group-open:rotate-180">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <p className="text-muted-foreground mt-2 pl-4">
                We accept all major credit cards, debit cards, UPI, and net banking options available in India.
              </p>
            </details>
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>Do you offer international shipping?</span>
                <span className="transition group-open:rotate-180">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <p className="text-muted-foreground mt-2 pl-4">
                Currently, we only ship within India. We&apos;re working on expanding our services internationally.
              </p>
            </details>
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>What is your return policy?</span>
                <span className="transition group-open:rotate-180">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <p className="text-muted-foreground mt-2 pl-4">
                We offer a 7-day return policy for unused items in their original packaging. Please refer to our Returns page for more details.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}