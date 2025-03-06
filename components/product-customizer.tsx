"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, Upload, Check } from "lucide-react"
import AddToCartButton from "@/components/add-to-cart-button"

export default function ProductCustomizer({ product, options, accessories }) {
  const [customization, setCustomization] = useState({
    coverColor: options.coverColors[0],
    pageLayout: options.pageLayouts[0],
    paperType: options.paperTypes[0],
    bindingType: options.bindingTypes[0],
    name: "",
    logo: null,
    selectedAccessories: [],
  })

  const [customizationStep, setCustomizationStep] = useState("options")
  const [showPreview, setShowPreview] = useState(false)

  const handleOptionChange = (option, value) => {
    setCustomization({
      ...customization,
      [option]: value,
    })
  }

  const handleNameChange = (e) => {
    setCustomization({
      ...customization,
      name: e.target.value,
    })
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real app, you would upload this to your server or cloud storage
      // For now, we'll just create a local URL
      const logoUrl = URL.createObjectURL(file)
      setCustomization({
        ...customization,
        logo: logoUrl,
      })
    }
  }

  const handleAccessoryToggle = (accessoryId) => {
    setCustomization({
      ...customization,
      selectedAccessories: customization.selectedAccessories.includes(accessoryId)
        ? customization.selectedAccessories.filter((id) => id !== accessoryId)
        : [...customization.selectedAccessories, accessoryId],
    })
  }

  const nextStep = () => {
    if (customizationStep === "options") {
      setCustomizationStep("personalization")
    } else if (customizationStep === "personalization") {
      setCustomizationStep("accessories")
    } else {
      setShowPreview(true)
    }
  }

  const prevStep = () => {
    if (customizationStep === "personalization") {
      setCustomizationStep("options")
    } else if (customizationStep === "accessories") {
      setCustomizationStep("personalization")
    } else {
      setShowPreview(false)
    }
  }

  // Calculate the total price including customizations and accessories
  const calculateTotalPrice = () => {
    let total = product.discountedPrice || product.price

    // Add price for accessories
    customization.selectedAccessories.forEach((accessoryId) => {
      const accessory = accessories.find((a) => a.id === accessoryId)
      if (accessory) {
        total += accessory.price
      }
    })

    return total
  }

  return (
    <div className="mt-6 border rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4">Customize Your Notebook</h3>

      <Tabs value={customizationStep} onValueChange={setCustomizationStep}>
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="options">Basic Options</TabsTrigger>
          <TabsTrigger value="personalization">Personalization</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>

        <TabsContent value="options" className="space-y-4">
          <div>
            <Label className="block mb-2">Cover Color</Label>
            <div className="flex flex-wrap gap-2">
              {options.coverColors.map((color) => (
                <TooltipProvider key={color}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className={`w-8 h-8 rounded-full border-2 ${
                          customization.coverColor === color
                            ? "border-primary ring-2 ring-primary ring-opacity-50"
                            : "border-gray-200"
                        }`}
                        style={{
                          backgroundColor: color.toLowerCase(),
                          borderColor: color.toLowerCase() === "white" ? "#e5e7eb" : "",
                        }}
                        onClick={() => handleOptionChange("coverColor", color)}
                      >
                        {customization.coverColor === color && <Check className="h-4 w-4 text-white m-auto" />}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{color}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>

          <div>
            <Label className="block mb-2">Page Layout</Label>
            <RadioGroup
              value={customization.pageLayout}
              onValueChange={(value) => handleOptionChange("pageLayout", value)}
              className="grid grid-cols-2 gap-2"
            >
              {options.pageLayouts.map((layout) => (
                <div key={layout} className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value={layout} id={`layout-${layout}`} />
                  <Label htmlFor={`layout-${layout}`} className="flex items-center">
                    <Image
                      src={`/placeholder.svg?height=24&width=24&text=${layout}`}
                      alt={layout}
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    {layout}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label className="block mb-2">Paper Type</Label>
            <RadioGroup
              value={customization.paperType}
              onValueChange={(value) => handleOptionChange("paperType", value)}
              className="grid grid-cols-2 gap-2"
            >
              {options.paperTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value={type} id={`paper-${type}`} />
                  <Label htmlFor={`paper-${type}`}>{type}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label className="block mb-2">Binding Type</Label>
            <RadioGroup
              value={customization.bindingType}
              onValueChange={(value) => handleOptionChange("bindingType", value)}
              className="grid grid-cols-2 gap-2"
            >
              {options.bindingTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value={type} id={`binding-${type}`} />
                  <Label htmlFor={`binding-${type}`}>{type}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button onClick={nextStep} className="w-full">
            Next: Personalization
          </Button>
        </TabsContent>

        <TabsContent value="personalization" className="space-y-4">
          <div>
            <Label htmlFor="custom-name" className="block mb-2">
              Add Your Name or Text
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-1 inline-block text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This text will be printed on the cover of your notebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="custom-name"
              value={customization.name}
              onChange={handleNameChange}
              placeholder="Enter your name or custom text"
              maxLength={30}
            />
            <p className="text-xs text-muted-foreground mt-1">{30 - customization.name.length} characters remaining</p>
          </div>

          <div>
            <Label className="block mb-2">
              Upload Logo or Image
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-1 inline-block text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your logo will be printed on the cover. Max size: 5MB</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              {customization.logo ? (
                <div className="flex flex-col items-center">
                  <Image
                    src={customization.logo || "/placeholder.svg"}
                    alt="Uploaded logo"
                    width={100}
                    height={100}
                    className="object-contain mb-2"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCustomization({ ...customization, logo: null })}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop your logo here, or click to browse</p>
                  <input type="file" id="logo-upload" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  <label htmlFor="logo-upload">
                    <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                      <span>Browse Files</span>
                    </Button>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={prevStep} className="flex-1">
              Back
            </Button>
            <Button onClick={nextStep} className="flex-1">
              Next: Accessories
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="accessories" className="space-y-4">
          <div>
            <Label className="block mb-2">Add Accessories</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {accessories.map((accessory) => (
                <div key={accessory.id} className="flex items-start space-x-2 border rounded-md p-3">
                  <Checkbox
                    id={`accessory-${accessory.id}`}
                    checked={customization.selectedAccessories.includes(accessory.id)}
                    onCheckedChange={() => handleAccessoryToggle(accessory.id)}
                  />
                  <div>
                    <Label htmlFor={`accessory-${accessory.id}`} className="font-medium">
                      {accessory.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">+${accessory.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={prevStep} className="flex-1">
              Back
            </Button>
            <Button onClick={() => setShowPreview(true)} className="flex-1">
              Preview Customization
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your Customized Notebook</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex justify-center">
              <div className="relative w-48 h-64 bg-gray-100 rounded-md shadow-md overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: customization.coverColor.toLowerCase() }}
                ></div>

                {customization.logo && (
                  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16">
                    <Image src={customization.logo || "/placeholder.svg"} alt="Logo" fill className="object-contain" />
                  </div>
                )}

                {customization.name && (
                  <div className="absolute bottom-8 left-0 right-0 text-center px-2">
                    <p className="text-sm font-medium text-white bg-black bg-opacity-30 py-1 px-2 rounded">
                      {customization.name}
                    </p>
                  </div>
                )}

                <div className="absolute bottom-2 right-2">
                  <p className="text-xs text-white bg-black bg-opacity-50 py-1 px-2 rounded">
                    {customization.bindingType}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium">Cover Color:</div>
              <div>{customization.coverColor}</div>

              <div className="font-medium">Page Layout:</div>
              <div>{customization.pageLayout}</div>

              <div className="font-medium">Paper Type:</div>
              <div>{customization.paperType}</div>

              <div className="font-medium">Binding Type:</div>
              <div>{customization.bindingType}</div>

              {customization.selectedAccessories.length > 0 && (
                <>
                  <div className="font-medium">Accessories:</div>
                  <div>
                    {accessories
                      .filter((a) => customization.selectedAccessories.includes(a.id))
                      .map((a) => a.name)
                      .join(", ")}
                  </div>
                </>
              )}

              <div className="font-medium">Total Price:</div>
              <div className="font-bold">${calculateTotalPrice().toFixed(2)}</div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Edit Customization
            </Button>
            <AddToCartButton
              product={{
                ...product,
                price: calculateTotalPrice(),
              }}
              customization={customization}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

