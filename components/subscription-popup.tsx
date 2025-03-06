"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import type React from "react"

export default function SubscriptionPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    // Open the popup 5 seconds after the website loads
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation() // Prevent additional click events from propagating
    console.log("Subscribed with email:", email)
    localStorage.setItem("subscribed", "true")
    // Use a short timeout to let any pending events finish before closing
    setTimeout(() => setIsOpen(false), 0)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-transparent" />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get 10% Off Your First Order</DialogTitle>
            <DialogDescription>
              Subscribe to our newsletter and receive exclusive offers and updates.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubscribe} className="space-y-4">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Subscribe &amp; Save
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By subscribing, you agree to our terms and privacy policy. You can unsubscribe at any time.
            </p>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
