"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function EventRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    eventName: "",
    workshopName: "",
    investment: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.email) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your full name and email address.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Registration successful!",
          description: "Thank you for registering. Please check your email for confirmation.",
        })
        setFormData({
          fullName: "",
          email: "",
          eventName: "",
          workshopName: "",
          investment: "",
        })
      } else {
        throw new Error("Registration failed")
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-orange-50 to-pink-50 flex flex-col items-center justify-center p-4">
      {/* Logo at top center */}
      

      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col-reverse lg:flex-row min-h-[500px]">
          {/* Left Side - Image */}
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50 z-10"></div>
            <img
              src="/images/maternity-workshop.jpg"
              alt="Professional maternity photography workshop session"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8 z-20 text-white">
              <h3 className="text-2xl font-bold mb-2">We are celebrating you at the</h3>
              <p className="text-lg opacity-90">Maternity &amp; Newborn Photography Summit !!</p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 bg-gray-900 p-6 lg:p-8 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Register with Photokrafft</h1>
                <p className="text-gray-300 text-sm">
                  Join us at Special MNPS Summit 2025 &amp; Get $200* in PHOTOKRAFFT Coupons - Just for attending
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                  <div className="relative">
                    <Input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Your full name"
                      required
                      className="bg-transparent border-0 border-b-2 border-gray-600 rounded-none text-white placeholder-gray-400 focus:border-orange-400 focus:ring-0 pb-3 text-base"
                    />
                  </div>

                  <div className="relative">
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Your email address"
                      required
                      className="bg-transparent border-0 border-b-2 border-gray-600 rounded-none text-white placeholder-gray-400 focus:border-orange-400 focus:ring-0 pb-3 text-base"
                    />
                  </div>

                  <div className="relative">
                    <Input
                      type="text"
                      value={formData.eventName}
                      onChange={(e) => handleInputChange("eventName", e.target.value)}
                      placeholder="Event name"
                      className="bg-transparent border-0 border-b-2 border-gray-600 rounded-none text-white placeholder-gray-400 focus:border-orange-400 focus:ring-0 pb-3 text-base"
                    />
                  </div>

                  <div className="relative">
                    <Input
                      type="text"
                      value={formData.workshopName}
                      onChange={(e) => handleInputChange("workshopName", e.target.value)}
                      placeholder="Workshop name"
                      className="bg-transparent border-0 border-b-2 border-gray-600 rounded-none text-white placeholder-gray-400 focus:border-orange-400 focus:ring-0 pb-3 text-base"
                    />
                  </div>

                  <div className="relative">
                    <Input
                      type="text"
                      value={formData.investment}
                      onChange={(e) => handleInputChange("investment", e.target.value)}
                      placeholder="Investment amount"
                      className="bg-transparent border-0 border-b-2 border-gray-600 rounded-none text-white placeholder-gray-400 focus:border-orange-400 focus:ring-0 pb-3 text-base"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-orange-400 hover:bg-orange-500 text-gray-900 font-semibold py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      "Register Now"
                    )}
                  </Button>
                </div>

                <div className="text-center pt-4">
                  <p className="text-gray-400 text-sm">Secure your spot at the premier photography summit</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
