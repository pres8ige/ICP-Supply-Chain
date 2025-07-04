"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Package, Plus, X, CheckCircle } from "lucide-react"
import Link from "next/link"
import { WalletConnect } from "@/components/wallet-connect"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    manufacturer: "",
    batchNumber: "",
    productionDate: "",
    rawMaterials: [],
    certifications: [],
    sustainabilityScore: "",
    location: "",
    estimatedValue: "",
  })

  const [newMaterial, setNewMaterial] = useState("")
  const [newCertification, setNewCertification] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const categories = [
    "Apparel",
    "Electronics",
    "Food & Beverage",
    "Pharmaceuticals",
    "Automotive",
    "Cosmetics",
    "Home & Garden",
    "Sports & Recreation",
  ]

  const commonCertifications = [
    "ISO 9001",
    "ISO 14001",
    "GOTS",
    "Fair Trade",
    "OEKO-TEX",
    "Organic",
    "FSC Certified",
    "Energy Star",
    "CE Marking",
  ]

  const addMaterial = () => {
    if (newMaterial.trim() && !formData.rawMaterials.includes(newMaterial.trim())) {
      setFormData((prev) => ({
        ...prev,
        rawMaterials: [...prev.rawMaterials, newMaterial.trim()],
      }))
      setNewMaterial("")
    }
  }

  const removeMaterial = (material: string) => {
    setFormData((prev) => ({
      ...prev,
      rawMaterials: prev.rawMaterials.filter((m) => m !== material),
    }))
  }

  const addCertification = () => {
    if (newCertification.trim() && !formData.certifications.includes(newCertification.trim())) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()],
      }))
      setNewCertification("")
    }
  }

  const removeCertification = (certification: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c !== certification),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to ICP canister
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Registered Successfully!</h2>
            <p className="text-gray-600 mb-6">Your product has been registered on the ICP blockchain with ID:</p>
            <Badge className="text-lg px-4 py-2 mb-6">CT-2024-{Math.random().toString().substr(2, 6)}</Badge>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/track">Track This Product</Link>
              </Button>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/register">Register Another Product</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">SupTrus</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/track" className="text-gray-600 hover:text-blue-600">
              Track Product
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>
            <WalletConnect />
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Register New Product</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the fundamental details about your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productName">Product Name *</Label>
                    <Input
                      id="productName"
                      value={formData.productName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, productName: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your product..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Manufacturing Details */}
            <Card>
              <CardHeader>
                <CardTitle>Manufacturing Details</CardTitle>
                <CardDescription>Information about production and manufacturing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="manufacturer">Manufacturer *</Label>
                    <Input
                      id="manufacturer"
                      value={formData.manufacturer}
                      onChange={(e) => setFormData((prev) => ({ ...prev, manufacturer: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="batchNumber">Batch Number</Label>
                    <Input
                      id="batchNumber"
                      value={formData.batchNumber}
                      onChange={(e) => setFormData((prev) => ({ ...prev, batchNumber: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productionDate">Production Date *</Label>
                    <Input
                      id="productionDate"
                      type="date"
                      value={formData.productionDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, productionDate: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Manufacturing Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="City, Country"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Raw Materials */}
            <Card>
              <CardHeader>
                <CardTitle>Raw Materials</CardTitle>
                <CardDescription>List the raw materials used in production</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newMaterial}
                    onChange={(e) => setNewMaterial(e.target.value)}
                    placeholder="Enter raw material..."
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addMaterial())}
                  />
                  <Button type="button" onClick={addMaterial}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.rawMaterials.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.rawMaterials.map((material, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {material}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeMaterial(material)} />
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>Add relevant certifications and standards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Select value={newCertification} onValueChange={setNewCertification}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select certification" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonCertifications.map((cert) => (
                        <SelectItem key={cert} value={cert}>
                          {cert}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={addCertification}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Input
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    placeholder="Or enter custom certification..."
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCertification())}
                  />
                  <Button type="button" onClick={addCertification}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {cert}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeCertification(cert)} />
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Optional details for enhanced tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sustainabilityScore">Sustainability Score (0-100)</Label>
                    <Input
                      id="sustainabilityScore"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.sustainabilityScore}
                      onChange={(e) => setFormData((prev) => ({ ...prev, sustainabilityScore: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimatedValue">Estimated Value (USD)</Label>
                    <Input
                      id="estimatedValue"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.estimatedValue}
                      onChange={(e) => setFormData((prev) => ({ ...prev, estimatedValue: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex space-x-4">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register Product"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
