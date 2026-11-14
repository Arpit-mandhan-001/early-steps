import { NextResponse } from "next/server";
import nodemailer from "nodemailer";



export async function POST(req: Request) {
  try {
    const { parentName, email, childAge, phone, preferredStartDate, message } =
      await req.json();

    if (!parentName || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"EarlySteps Dayhome Enquiry" <${process.env.GMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      replyTo: email,
      subject: "New Enrollment Enquiry - EarlySteps Dayhome",
      text: `
New Enrollment Enquiry

Parent Name: ${parentName}
Email: ${email}
Phone: ${phone}
Child Age: ${childAge || "Not provided"}
Preferred Start Date: ${preferredStartDate || "Not provided"}

Message:
${message}
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully!",
    });
  } catch (error) {
    console.error("Email sending error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send enquiry. Please try again.",
      },
      { status: 500 },
    );
  }
}
