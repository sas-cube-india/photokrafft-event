import { type NextRequest, NextResponse } from "next/server"

// In-memory storage reference
const registrations: any[] = []

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const index = registrations.findIndex((reg) => reg.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 })
    }

    registrations.splice(index, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
