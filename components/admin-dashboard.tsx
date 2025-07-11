"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { LogOut, Users, Search, Download, Trash2 } from "lucide-react"

interface Registration {
  id: number
  fullName: string
  email: string
  eventName: string
  workshopName: string
  investment: string
  registeredAt: string
}

export function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchRegistrations()
  }, [])

  useEffect(() => {
    const filtered = registrations.filter(
      (reg) =>
        reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.workshopName.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredRegistrations(filtered)
  }, [searchTerm, registrations])

  const fetchRegistrations = async () => {
    try {
      const response = await fetch("/api/admin/registrations")
      if (response.ok) {
        const data = await response.json()
        setRegistrations(data)
        setFilteredRegistrations(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch registrations",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/registrations/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setRegistrations((prev) => prev.filter((reg) => reg.id !== id))
        toast({
          title: "Success",
          description: "Registration deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete registration",
        variant: "destructive",
      })
    }
  }

  const exportToCSV = () => {
    const headers = ["Full Name", "Email", "Event Name", "Workshop Name", "Investment", "Registered At"]
    const csvContent = [
      headers.join(","),
      ...filteredRegistrations.map((reg) =>
        [reg.fullName, reg.email, reg.eventName, reg.workshopName, reg.investment, reg.registeredAt].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "event-registrations.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Event Registration Admin</h1>
          <Button
            variant="outline"
            className="text-black border-white hover:bg-white bg-transparent"
            onClick={() => window.location.reload()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-2 border-black">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-black mr-2" />
                <span className="text-2xl font-bold text-black">{registrations.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Today's Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">
                {
                  registrations.filter((reg) => new Date(reg.registeredAt).toDateString() === new Date().toDateString())
                    .length
                }
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Most Popular Event</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold text-black">
                {registrations.length > 0 ? "Photography Summit" : "N/A"}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">
                ₹
                {registrations
                  .reduce((sum, reg) => {
                    const amount =
                      reg.investment === "free" || reg.investment === "Free"
                        ? 0
                        : Number.parseInt(reg.investment.replace(/[^\d]/g, "")) || 0
                    return sum + amount
                  }, 0)
                  .toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-black">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="text-xl">Event Registrations</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search registrations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-gray-300 focus:border-black"
                  />
                </div>
                <Button onClick={exportToCSV} className="bg-black hover:bg-gray-800 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold text-black">Full Name</TableHead>
                    <TableHead className="font-bold text-black">Email</TableHead>
                    <TableHead className="font-bold text-black">Event</TableHead>
                    <TableHead className="font-bold text-black">Workshop</TableHead>
                    <TableHead className="font-bold text-black">Investment</TableHead>
                    <TableHead className="font-bold text-black">Registered</TableHead>
                    <TableHead className="font-bold text-black">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((registration) => (
                    <TableRow key={registration.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{registration.fullName}</TableCell>
                      <TableCell>{registration.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-black text-black">
                          {registration.eventName || "N/A"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-400">
                          {registration.workshopName || "N/A"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{registration.investment || "N/A"}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(registration.registeredAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(registration.id)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredRegistrations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm ? "No registrations found matching your search." : "No registrations yet."}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
