"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { useSearch } from "@/context/search-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Menu, ShoppingCart, User, Heart, X } from "lucide-react"
import { searchProducts } from "@/lib/search"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { cart } = useCart()
  const { searchQuery, setSearchQuery, searchResults, setSearchResults, isSearching, setIsSearching } = useSearch()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About Us", href: "/#about-us" },
    { name: "Contact", href: "/#contact" },
  ]

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    setIsSearching(true)

    try {
      // Search for products
      const results = await searchProducts(searchQuery)
      setSearchResults(results)

      // Navigate to search results page
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // If it's a hash link on the homepage, handle smooth scrolling
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault()
      const targetId = href.substring(2)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-8">
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`block py-2 text-lg ${
                          pathname === item.href
                            ? "font-medium text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={(e) => handleNavLinkClick(e, item.href)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/placeholder.svg?height=32&width=32&text=SN"
              alt="Smart Notebooks"
              width={32}
              height={32}
              className="mr-2"
            />
            <span className="font-bold text-xl hidden sm:inline-block">ReNote AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={(e) => handleNavLinkClick(e, item.href)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            {isMobileSearchOpen ? <X className="h-6 w-6" /> : <Search className="h-6 w-6" />}
            <span className="sr-only">Search</span>
          </Button>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0">
                <Search className="h-4 w-4 text-muted-foreground" />
              </Button>
            </form>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/account/profile" className="flex w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/account/orders" className="flex w-full">
                    Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/account/wishlist" className="flex w-full">
                    Wishlist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/auth/login" className="flex w-full">
                    Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/auth/register" className="flex w-full">
                    Register
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>

            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {totalItems}
                    </span>
                  )}
                  <span className="sr-only">Open cart</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Shopping Cart ({totalItems})</SheetTitle>
                </SheetHeader>

                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                    <Button className="mt-4" asChild>
                      <Link href="/products">Shop Now</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-auto py-4">
                      <ul className="space-y-4">
                        {cart.map((item) => (
                          <li key={item.id} className="flex items-center gap-4">
                            <div className="h-16 w-16 overflow-hidden rounded-md border">
                              <Image
                                src={item.image || "/placeholder.svg?height=64&width=64"}
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
                            <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-4">
                        <span className="font-medium">Subtotal</span>
                        <span className="font-medium">
                          ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Shipping and taxes calculated at checkout</p>
                      <div className="grid gap-2">
                        <Button asChild>
                          <Link href="/cart">View Cart</Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href="/checkout">Checkout</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="pb-4 md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0">
                <Search className="h-4 w-4 text-muted-foreground" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
