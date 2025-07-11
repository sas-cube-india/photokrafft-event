import { Poppins } from "next/font/google"

// Load Poppins with the weights we need
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})
