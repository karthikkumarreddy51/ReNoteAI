"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react";
import { useCart } from "@/context/cart-context";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import PaymentCard from "@/components/PaymentCard";

/* Move ambient declaration to top level */
declare global {
  interface Window {
    Razorpay: any;
  }
}

// Add interface for API error response
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

// Define interface for shipping rates
interface ShippingRate {
  id: string;
  name: string;
  price: number;
  days: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, clearCart, addToCart } = useCart();
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'IN'
  });

  useEffect(() => {
    // Replace the nullable searchParams.get() call with safe access
    const buyNowParam = searchParams?.get('buyNow');
    if (buyNowParam) {
      try {
        clearCart();
        const item = JSON.parse(decodeURIComponent(buyNowParam));
        addToCart(item);
      } catch (error) {
        console.error('Failed to parse buyNow parameter:', error);
        toast.error('Invalid product data');
      }
    }
  }, [searchParams, clearCart, addToCart]);

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  // Removed tax calculation; only shipping tax remains.
  // const tax = subtotal * 0.08; // Removed tax calculation
  const tax = 0;
  const shipping =
    shippingMethod === "express"
      ? 99
      : shippingMethod === "standard"
      ? 49
      : 0;
  const total = subtotal + shipping + tax; // total becomes subtotal + shipping

  // Updated shipping rates without minimum property
  const shippingRates: ShippingRate[] = [
    { id: "standard", name: "Standard Shipping", price: 49, days: "3-5" },
    { id: "express", name: "Express Shipping", price: 99, days: "1-2" },
  ];

  const processPayment = async () => {
    setIsProcessing(true);
    try {
      const amountInPaise = Math.round(total * 100);
      
      if (isNaN(amountInPaise) || amountInPaise <= 0) {
        throw new Error('Invalid amount');
      }

      const { data } = await axios.post('/api/razorpay', {
        amount: amountInPaise
      });

      if (!data?.orderId || !data?.keyId) {
        throw new Error('Invalid order response');
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "ReNote AI",
        description: "Smart Notebook Purchase",
        order_id: data.orderId,
        prefill: {
          name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
          email: shippingDetails.email,
          contact: shippingDetails.phone
        },
        handler: async function(response: any) {
          try {
            // Handle successful payment
            const confirmResponse = await axios.post('/api/payment-success', {
              paymentDetails: response,
              orderDetails: {
                items: cart,
                amount: total
              },
              shippingDetails
            });

            if (confirmResponse.data.success) {
              clearCart();
              toast.success('Payment successful! Your order has been placed.', {
                duration: 5000,
                position: 'top-center',
                style: {
                  background: '#10B981',
                  color: '#fff',
                }
              });
              router.push('/checkout/success');
            }
          } catch (error) {
            handlePaymentError(error);
          } finally {
            setIsProcessing(false); // Ensure processing state is reset
          }
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false); // Reset processing state when modal is closed
            toast.error('Payment cancelled. Please try again.', {
              duration: 3000,
              position: 'top-center',
              style: {
                background: '#EF4444',
                color: '#fff',
              }
            });
          },
          escape: true,
          confirm_close: true
        },
        retry: {
          enabled: false
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function(resp: any) {
        console.error('Payment failed:', resp.error);
        setIsProcessing(false); // Reset processing state on failure
        toast.error('Payment failed. Please try again.', {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#EF4444',
            color: '#fff',
          }
        });
      });

      rzp.open();
    } catch (error: any) {
      // Enhanced error logging for debugging 500 errors
      console.error("Payment Error details:", error.response?.data || error.message);
      // Fallback: force open Razorpay modal with preset key from env vars
      const fallbackOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: Math.round(total * 100),
        currency: "INR",
        name: "ReNote AI",
        description: "Smart Notebook Purchase",
        order_id: `fallback_order_${Date.now()}`,
        prefill: {
          name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
          email: shippingDetails.email,
          contact: shippingDetails.phone
        },
        handler: async function(response: any) {
          // ...fallback success handler...
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            toast.error('Payment cancelled. Please try again.', {
              duration: 3000,
              position: 'top-center',
              style: { background: '#EF4444', color: '#fff' }
            });
          },
          escape: true,
          confirm_close: true
        },
        retry: { enabled: false }
      };
      const rzpFallback = new window.Razorpay(fallbackOptions);
      rzpFallback.open();
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment Error:', error);
    setIsProcessing(false); // Reset processing state
    const errorMessage = error.response?.data?.error || error.message || 'Payment failed';
    toast.error(errorMessage, {
      duration: 3000,
      position: 'top-center',
      style: {
        background: '#EF4444',
        color: '#fff',
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await processPayment();
  };

  // Update shipping details handler
  const handleShippingDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [id]: value
    }));
  };

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
                    <Input id="email" type="email" required className="mt-1" onChange={handleShippingDetailsChange} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" required className="mt-1" onChange={handleShippingDetailsChange} />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required className="mt-1" onChange={handleShippingDetailsChange} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required className="mt-1" onChange={handleShippingDetailsChange} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" required className="mt-1" onChange={handleShippingDetailsChange} />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required className="mt-1" onChange={handleShippingDetailsChange} />
                  </div>
                  <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" required className="mt-1" onChange={handleShippingDetailsChange} />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                    <Input id="zip" required className="mt-1" onChange={handleShippingDetailsChange} />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="IN">
                      <SelectTrigger id="country" className="mt-1">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IN">India</SelectItem>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="JP">Japan</SelectItem>
                        <SelectItem value="CN">China</SelectItem>
                        <SelectItem value="BR">Brazil</SelectItem>
                        <SelectItem value="RU">Russia</SelectItem>
                        <SelectItem value="ZA">South Africa</SelectItem>
                        {/* ...add any additional countries as needed... */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <Checkbox id="saveAddress" />
                    <Label htmlFor="saveAddress" className="ml-2 text-sm font-normal">
                      Save this address for future orders
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
                      }`}
                    >
                      <div className="flex items-start">
                        <RadioGroupItem
                          value={rate.id}
                          id={`shipping-${rate.id}`}
                        />
                        <div className="ml-3">
                          <Label htmlFor={`shipping-${rate.id}`} className="font-medium">
                            {rate.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Estimated delivery: {rate.days} business days
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span>Rs.{rate.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Payment Method */}
              {/*
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-medium mb-4">Payment Method</h2>
                <Tabs defaultValue="razorpay" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="razorpay">Razorpay</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  </TabsList>
                  <TabsContent value="card" className="mt-4 space-y-4">
                    ...existing Credit Card markup...
                  </TabsContent>
                  <TabsContent value="razorpay" className="mt-4">
                    <div className="text-center py-8">
                      <CreditCard className="h-12 w-12 mx-auto text-primary mb-4" />
                      <p className="mb-4">You will be redirected to Razorpay to complete your payment securely.</p>
                      <div className="flex justify-center space-x-2">
                        <PaymentCard type="Visa" />
                        <PaymentCard type="MC" />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="paypal" className="mt-4">
                    <div className="text-center py-8">
                      ...existing PayPal markup...
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              */}

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
                {isProcessing ? "Processing..." : `Pay Rs.${total.toFixed(2)}`}
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
                    {/* Changed '$' to 'Rs.' */}
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × Rs.{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    {/* Changed '$' to 'Rs.' */}
                    <p className="text-sm font-medium">Rs.{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{`Rs.${subtotal.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : `Rs.${shipping.toFixed(2)}`}</span>
              </div>
              {/*
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{`Rs.${tax.toFixed(2)}`}</span>
              </div>
              */}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between mb-6">
              <span className="font-medium">Total</span>
              <span className="font-bold text-lg">{`Rs.${total.toFixed(2)}`}</span>
            </div>

            <div className="hidden lg:block">
              {/* Use the helper function directly onClick */}
              <Button type="button" className="w-full" size="lg" disabled={isProcessing} onClick={processPayment}>
                {isProcessing ? "Processing..." : `Pay Rs.${total.toFixed(2)}`}
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
  );
}
