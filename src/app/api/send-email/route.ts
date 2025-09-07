// app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // اعتبارسنجی داده‌های ورودی
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "تمام فیلدهای الزامی باید پر شوند" },
        { status: 400 }
      );
    }

    // اعتبارسنجی فرمت ایمیل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "فرمت ایمیل معتبر نیست" },
        { status: 400 }
      );
    }

    // تنظیم transporter برای Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    // تنظیمات ایمیل
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "heydarrabbaniha@gmail.com",
      subject: `پیام جدید از وبسایت: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            پیام جدید از وبسایت
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong style="color: #555;">نام:</strong> ${name}</p>
            <p><strong style="color: #555;">ایمیل:</strong> ${email}</p>
            <p><strong style="color: #555;">موضوع:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">متن پیام:</h3>
            <p style="line-height: 1.6; color: #666;">${message.replace(
              /\n/g,
              "<br>"
            )}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 10px; background-color: #e8f5e8; border-radius: 5px;">
            <p style="margin: 0; color: #555; font-size: 12px;">
              این پیام از طریق فرم تماس وبسایت ارسال شده است.
            </p>
          </div>
        </div>
      `,
      // ایمیل ساده برای کلاینت‌هایی که HTML را پشتیبانی نمی‌کنند
      text: `
پیام جدید از وبسایت

نام: ${name}
ایمیل: ${email}  
موضوع: ${subject}

متن پیام:
${message}

این پیام از طریق فرم تماس وبسایت ارسال شده است.
      `,
    };

    // ارسال ایمیل
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "ایمیل با موفقیت ارسال شد" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("خطا در ارسال ایمیل:", error);

    return NextResponse.json(
      {
        error: "خطا در ارسال ایمیل",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
