"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react"
import { useCart } from "@/context/cart-context"
import axios from "axios"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [isProcessing, setIsProcessing] = useState(false)
  const { cart, clearCart } = useCart()
  const router = useRouter()

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = shippingMethod === "express" ? 9.99 : shippingMethod === "standard" ? 4.99 : 0
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + shipping + tax

  // Shipping rates from Shiprocket
  const shippingRates = [
    { id: "standard", name: "Standard Shipping", price: 4.99, days: "3-5" },
    { id: "express", name: "Express Shipping", price: 9.99, days: "1-2" },
    { id: "free", name: "Free Shipping", price: 0, days: "5-7", minimum: 50 },
  ]

  // Helper function that performs payment processing
  const processPayment = async () => {
    setIsProcessing(true)
    try {
      const order = await axios.post('/api/razorpay', { amount: total * 100, currency: 'INR' })
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.data.amount,
        currency: order.data.currency,
        name: 'ReNote AI',
        description: 'Smart Notebook Purchase',
        order_id: order.data.id,
        handler: async (response) => {
          // Handle successful payment
          await axios.post('/api/createOrder', {
            products: cart,
            totalAmount: total,
            shippingAddress: {
              // Add shipping address details here
            }
          })
          clearCart()
          router.push('/checkout/success')
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        notes: {
          address: 'Customer Address'
        },
        theme: {
          color: '#3399cc'
        }
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error('Payment processing failed', error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Form submit handler (for the form element)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await processPayment()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/cart">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-medium mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" required className="mt-1" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <Checkbox id="saveInfo" />
                    <Label htmlFor="saveInfo" className="ml-2 text-sm font-normal">
                      Email me with news and offers
                    </Label>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name (optional)</Label>
                    <Input id="firstName" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input id="apartment" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Select defaultValue="Telangana">
                      <SelectTrigger id="state" className="mt-1">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Telangana">Telangana</SelectItem>
                        {/* Add other states as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zip">PIN code</Label>
                    <Input id="zip" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="India">
                      <SelectTrigger id="country" className="mt-1">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="India">India</SelectItem>
                        {/* Add other countries as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" required className="mt-1" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <Checkbox id="saveAddress" />
                    <Label htmlFor="saveAddress" className="ml-2 text-sm font-normal">
                      Save this information for next time
                    </Label>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-medium mb-4">Shipping Method</h2>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
                  {shippingRates.map((rate) => (
                    <div
                      key={rate.id}
                      className={`flex items-center justify-between border rounded-md p-4 ${
                        shippingMethod === rate.id ? "border-primary bg-primary/5" : ""
                      } ${rate.minimum && subtotal < rate.minimum ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <div className="flex items-start">
                        <RadioGroupItem
                          value={rate.id}
                          id={`shipping-${rate.id}`}
                          disabled={rate.minimum !== undefined ? subtotal < rate.minimum : false}
                        />
                        <div className="ml-3">
                          <Label htmlFor={`shipping-${rate.id}`} className="font-medium">
                            {rate.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">Estimated delivery: {rate.days} business days</p>
                          {rate.minimum && (
                            <p className="text-xs text-muted-foreground mt-1">Free for orders over ${rate.minimum}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        {rate.price === 0 ? (
                          <span className="font-medium text-green-600">Free</span>
                        ) : (
                          <span>${rate.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Payment Method */}
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-medium mb-4">Payment Method</h2>
                <Tabs defaultValue="razorpay" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="razorpay">Razorpay</TabsTrigger>
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  </TabsList>
                  <TabsContent value="razorpay" className="mt-4">
                    <div className="text-center py-8">
                      <CreditCard className="h-12 w-12 mx-auto text-primary mb-4" />
                      <p className="mb-4">You will be redirected to Razorpay to complete your payment securely.</p>
                      <div className="flex justify-center space-x-2">
                        <Image src="/placeholder.svg?height=30&width=50&text=Visa" alt="Visa" width={50} height={30} />
                        <Image
                          src="/placeholder.svg?height=30&width=50&text=MC"
                          alt="Mastercard"
                          width={50}
                          height={30}
                        />
                        <Image
                          src="/placeholder.svg?height=30&width=50&text=Amex"
                          alt="American Express"
                          width={50}
                          height={30}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="card" className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input id="nameOnCard" className="mt-1" />
                    </div>
                  </TabsContent>
                  <TabsContent value="paypal" className="mt-4">
                    <div className="text-center py-8">
                      <Image
                        src="/placeholder.svg?height=60&width=120&text=PayPal"
                        alt="PayPal"
                        width={120}
                        height={60}
                        className="mx-auto mb-4"
                      />
                      <p>You will be redirected to PayPal to complete your payment securely.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Billing Address */}
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-medium mb-4">Billing Address</h2>
                <div className="mb-4">
                  <div className="flex items-center">
                    <Checkbox id="sameAsShipping" defaultChecked />
                    <Label htmlFor="sameAsShipping" className="ml-2">
                      Same as shipping address
                    </Label>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <Checkbox id="differentBilling" />
                    <Label htmlFor="differentBilling" className="ml-2 text-sm font-normal">
                      Use a different billing address
                    </Label>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-medium mb-4">Additional Information</h2>
                <div>
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <textarea
                    id="notes"
                    className="mt-1 w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Special instructions for delivery or any other notes"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:hidden">
              <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between mb-6">
              <span className="font-medium">Total</span>
              <span className="font-bold text-lg">${total.toFixed(2)}</span>
            </div>

            <div className="hidden lg:block">
              {/* Use the helper function directly onClick */}
              <Button type="button" className="w-full" size="lg" disabled={isProcessing} onClick={processPayment}>
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </Button>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <p className="text-muted-foreground">
                  Your payment information is processed securely. We do not store credit card details.
                </p>
              </div>
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <p className="text-muted-foreground">
                  Shipping calculated based on your location and selected shipping method.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
