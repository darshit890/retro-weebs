import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const OrdersPage = () => {
  return (
    <Card>
        <CardHeader className='px-7'>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store!</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <p className='font-medium'>Darshit Rajvansh</p>
                            <p className='hidden md:flex text-sm text-muted-foreground'>flamehashira007@gmail.com</p>
                        </TableCell>
                        <TableCell>Sale</TableCell>
                        <TableCell>Successfull</TableCell>
                        <TableCell>2024-06-15</TableCell>
                        <TableCell className='text-right'>$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}

export default OrdersPage