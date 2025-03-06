import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, FileText } from "lucide-react"

export default function CheckoutSuccessPage() {
  // Mock order details
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000)
  const orderDate = new Date().toLocaleDateString()
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()

  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />

      <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
      <p className="text-xl text-muted-foreground mb-8">Your order has been received and is being processed.</p>

      <div className="bg-muted/50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Order Number</h3>
            <p className="text-lg font-bold">{orderNumber}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Order Date</h3>
            <p className="text-lg">{orderDate}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Estimated Delivery</h3>
            <p className="text-lg">{estimatedDelivery}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <p>We've sent a confirmation email to your email address with all the details of your order.</p>
        <p>You can track your order status in your account dashboard.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/account/orders">
            <Package className="mr-2 h-4 w-4" />
            Track Order
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/account/orders">
            <FileText className="mr-2 h-4 w-4" />
            View Order Details
          </Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  )
}

