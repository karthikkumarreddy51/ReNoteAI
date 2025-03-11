export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Shipping & Return Policy
        </h1>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
          <div className="prose prose-blue max-w-none">
            {/* Introduction */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-8">
              <p className="text-gray-700 font-medium text-lg">
                Thank you for choosing ReNote AI! We strive to provide high-quality smart reusable notebooks...
              </p>
            </div>

            {/* Policy Points */}
            <div className="space-y-6">
              <section className="bg-white/50 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-blue-900">Return & Refund Policy</h2>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Non-Returnable & Non-Refundable:</span>
                      <p className="text-gray-600">
                        Once shipped, ReNote AI books cannot be returned or refunded due to the nature of the product.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Order Cancellation:</span>
                      <p className="text-gray-600">
                        Cancellations are only accepted before shipment. Once your order is shipped, it cannot be cancelled.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <div>
                      <span className="font-medium">Damaged or Defective Products:</span>
                      <p className="text-gray-600">
                        If you receive a damaged or defective product, please contact us within 24 hours of delivery with unboxing photos/videos as proof. We will review and provide a suitable resolution.
                      </p>
                    </div>
                  </li>
                </ul>
              </section>
            </div>

            {/* Contact Section */}
            <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
              <p className="text-gray-700">
                For any concerns, please reach out to our support team at{' '}
                <a href="mailto:sales@renote.ai" className="text-blue-600 hover:text-blue-800 font-medium">
                  sales@renote.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
