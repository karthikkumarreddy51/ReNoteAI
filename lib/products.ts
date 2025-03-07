// This is a mock product service
// In a real application, you would fetch this data from an API

const products = [
  {
    id: "1",
    name: "Classic ReNote Notebook",
    description: "Our flagship reusable smart notebook with 80 pages",
    fullDescription:
      "The Classic ReNote Notebook is our flagship product, featuring 80 reusable pages that can be wiped clean with a damp cloth. Write, scan, and erase - then start all over again. Perfect for students, professionals, and anyone who wants to reduce paper waste while keeping their notes organized digitally.",
    price: 1499,
    originalPrice: 1999,
    image: "/placeholder.svg?height=400&width=400&text=Classic+ReNote",
    badge: "Best Seller",
    stock: 50,
    category: "notebooks",
    tags: ["reusable", "smart", "eco-friendly"],
  },
  {
    id: "2",
    name: "ReNote Mini",
    description: "Pocket-sized reusable notebook for on-the-go note-taking",
    fullDescription:
      "The ReNote Mini is perfect for quick notes and ideas when you're on the move. Despite its compact size, it still offers all the smart features of our larger notebooks. Easily fits in your pocket or small bag.",
    price: 999,
    originalPrice: 1299,
    image: "/placeholder.svg?height=400&width=400&text=ReNote+Mini",
    badge: "New Arrival",
    stock: 35,
    category: "notebooks",
    tags: ["mini", "portable", "reusable"],
  },
  {
    id: "3",
    name: "ReNote Executive",
    description: "Premium leather-bound smart notebook for professionals",
    fullDescription:
      "The ReNote Executive is our premium offering, featuring a genuine leather cover and high-quality reusable pages. The elegant design makes it perfect for business meetings and professional settings, while still offering all the smart features you expect from ReNote.",
    price: 2499,
    originalPrice: 2999,
    image: "/placeholder.svg?height=400&width=400&text=ReNote+Executive",
    badge: "Limited Edition",
    stock: 15,
    category: "notebooks",
    tags: ["premium", "leather", "professional"],
  },
  {
    id: "4",
    name: "ReNote Color",
    description: "Smart notebook with colored pages for creative expression",
    fullDescription:
      "The ReNote Color features pastel-colored pages that make your notes visually distinctive while still being fully scannable with our app. Perfect for visual thinkers, artists, and anyone who wants to add some color to their note-taking experience.",
    price: 1699,
    originalPrice: 1999,
    image: "/placeholder.svg?height=400&width=400&text=ReNote+Color",
    badge: "Special Discount",
    stock: 25,
    category: "notebooks",
    tags: ["colored", "creative", "reusable"],
  },
]

export async function getAllProducts() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products
}

export async function getProductById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products.find((product) => product.id === id)
}

export async function getProductsByCategory(category: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products.filter((product) => product.category === category)
}

