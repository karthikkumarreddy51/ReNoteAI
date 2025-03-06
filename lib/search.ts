// This would be a server-side function in a real app
export async function searchProducts(query: string) {
  // Mock product data for search
  const allProducts = [
    {
      id: "1",
      name: "Air – AI-Powered Smart Reusable Notebook",
      description: "Smart Templates & AI Assistance",
      price: 24.99,
      discountedPrice: 19.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "New Arrival",
      rating: 4.8,
      reviewCount: 124,
    },
    {
      id: "2",
      name: "Pro – Professional Smart Notebook",
      description: "Perfect for business professionals",
      price: 34.99,
      discountedPrice: 29.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "Best Seller",
      rating: 4.9,
      reviewCount: 256,
    },
    {
      id: "3",
      name: "Mini – Pocket Smart Notebook",
      description: "Compact and portable",
      price: 19.99,
      discountedPrice: 14.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "Special Discount",
      rating: 4.7,
      reviewCount: 98,
    },
    {
      id: "4",
      name: "Executive – Premium Smart Notebook",
      description: "Luxury design with premium features",
      price: 49.99,
      discountedPrice: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "Limited Edition",
      rating: 4.9,
      reviewCount: 87,
    },
    {
      id: "5",
      name: "Student – Academic Smart Notebook",
      description: "Designed for students and educators",
      price: 22.99,
      discountedPrice: 19.99,
      image: "/placeholder.svg?height=300&width=300",
      status: null,
      rating: 4.6,
      reviewCount: 142,
    },
    {
      id: "6",
      name: "Architect – Drawing Smart Notebook",
      description: "Specialized for architects and designers",
      price: 39.99,
      discountedPrice: 34.99,
      image: "/placeholder.svg?height=300&width=300",
      status: null,
      rating: 4.8,
      reviewCount: 76,
    },
    {
      id: "7",
      name: "Journal – Daily Smart Notebook",
      description: "Perfect for journaling and daily notes",
      price: 24.99,
      discountedPrice: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      status: "New",
      rating: 4.7,
      reviewCount: 53,
    },
    {
      id: "8",
      name: "Kids – Children's Smart Notebook",
      description: "Designed for children with fun templates",
      price: 19.99,
      discountedPrice: 17.99,
      image: "/placeholder.svg?height=300&width=300",
      status: null,
      rating: 4.9,
      reviewCount: 112,
    },
    {
      id: "9",
      name: "Artist – Sketch Smart Notebook",
      description: "For artists and creative professionals",
      price: 29.99,
      discountedPrice: 29.99,
      image: "/placeholder.svg?height=300&width=300",
      status: null,
      rating: 4.8,
      reviewCount: 94,
    },
  ]

  // Simple search implementation
  const normalizedQuery = query.toLowerCase().trim()

  return allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery),
  )
}

