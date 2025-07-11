import { NextResponse } from "next/server"

// This would connect to your actual database
// For demo purposes, we'll use the same in-memory storage
const registrations: any[] = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john@example.com",
    eventName: "Photography Summit 2025",
    workshopName: "Portrait Photography",
    investment: "₹2500",
    registeredAt: new Date().toISOString(),
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane@example.com",
    eventName: "Maternity Workshop",
    workshopName: "Newborn Photography",
    investment: "₹5000",
    registeredAt: new Date(Date.now() - 86400000).toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(registrations)
}
