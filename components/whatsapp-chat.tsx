"use client"

// Create the WhatsApp chat component since it's being imported in layout.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-72 overflow-hidden">
          <div className="bg-green-500 text-white p-4 flex justify-between items-center">
            <h3 className="font-medium">Chat with us</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-green-600"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-4">
            <p className="text-sm mb-4">
              Hi there! 👋 <br />
              How can we help you today?
            </p>
            <Button
              className="w-full bg-green-500 hover:bg-green-600"
              onClick={() => {
                window.open("https://wa.me/1234567890", "_blank")
              }}
            >
              Start Chat
            </Button>
          </div>
        </div>
      ) : (
        <Button
          className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
        </Button>
      )}
    </div>
  )
}

