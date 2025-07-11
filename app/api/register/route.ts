import { type NextRequest, NextResponse } from "next/server"
import { sendRegistrationEmail } from "@/lib/mailer"

// In-memory storage for demo purposes
// In production, you would use a real database
const registrations: any[] = []
let nextId = 1

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const registration = {
      id: nextId++,
      fullName: body.fullName,
      email: body.email,
      eventName: body.eventName,
      workshopName: body.workshopName,
      investment: body.investment,
      registeredAt: new Date().toISOString(),
    }

    registrations.push(registration)

    // Send confirmation email
    try {
      await sendRegistrationEmail(body.email, body.fullName)
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
      // Continue with registration even if email fails
    }

    return NextResponse.json({ success: true, id: registration.id })
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
