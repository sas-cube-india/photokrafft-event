import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendRegistrationEmail(to: string, fullName: string) {
  const mailOptions = {
    from: process.env.SMTP_FROM || "noreply@photokrafft.com",
    to: to,
    subject: "Registration Confirmation - Photokrafft",
    html: `
      <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #000000; font-size: 16px; font-weight: 700; margin: 0;">Photokrafft</h1>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 30px; border-radius: 8px; border: 2px solid #000000;">
          <h2 style="color: #000000; font-size: 16px; font-weight: 600; margin-bottom: 20px;">Dear ${fullName},</h2>
          
          <p style="color: #333333; font-size: 14px; line-height: 1.6; margin-bottom: 15px;">
            Thanks for registering with <strong>Photokrafft</strong>. We appreciate you visiting our booth at 
            <strong>Maternity & Newborn Photographer's Summit 2025</strong>.
          </p>
          
          <p style="color: #333333; font-size: 14px; line-height: 1.6; margin-bottom: 15px;">
            Upon confirmation, your coupons will be available for access under your 
            <strong>MyPhotokrafft Account</strong> soon.
          </p>
          
          <p style="color: #333333; font-size: 14px; line-height: 1.6; margin-bottom: 15px;">
            Additionally, you will be receiving an email when the coupon gets active.
          </p>
          
          <p style="color: #333333; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
            Thank you once again! Looking forward to working on your first 
            <strong>Lullabook / Bumpbook</strong>.
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <div style="background-color: #000000; color: #ffffff; padding: 15px; border-radius: 5px; display: inline-block;">
              <p style="margin: 0; font-size: 14px; font-weight: 500;">Best Regards,<br>Team Photokrafft</p>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <p style="color: #666666; font-size: 12px;">
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      </div>
    `,
    text: `
Dear ${fullName},

Thanks for registering with Photokrafft. We appreciate you visiting our booth at Maternity & Newborn Photographer's Summit 2025.

Upon confirmation, your coupons will be available for access under your MyPhotokrafft Account soon.

Additionally, you will be receiving an email when the coupon gets active.

Thank you once again! Looking forward to working on your first Lullabook / Bumpbook.

Best Regards,
Team Photokrafft
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error }
  }
}
