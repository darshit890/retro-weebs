'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckOut } from '@/app/action';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface AddressFormProps {
  totalAmount: number;
  userId: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function AddressForm({ totalAmount, userId }: AddressFormProps) {
  const [address, setAddress] = useState<Address>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const checkoutData = await CheckOut({
        ...address,
        id: '', // Generate a unique ID or get it from the server
        orderId: '', // This should be generated on the server
      }, totalAmount, userId);
      
      if (checkoutData && typeof window !== 'undefined' && window.Razorpay) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: checkoutData.amount,
          currency: checkoutData.currency,
          name: 'Your Store Name',
          description: 'Purchase Description',
          order_id: checkoutData.orderId,
          handler: function (response: any) {
            console.log(response);
            router.push('/payment/success');
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        console.error('Razorpay not initialized or checkout data is missing');
        router.push('/payment/error');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      router.push('/payment/error');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = Object.values(address).every(value => value.trim() !== '');

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold">Shipping Address</h3>
      {Object.entries(address).map(([key, value]) => (
        <div key={key}>
          <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
          <Input
            id={key}
            name={key}
            value={value}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <Button 
        disabled={isLoading || !isFormValid} 
        type="submit"
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Proceed to Payment'
        )}
      </Button>
    </form>
  );
}