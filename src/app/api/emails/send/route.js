import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function formatCurrency(amount) {
  return `$${(amount / 100).toFixed(2)}`;
}

export async function POST(req) {
  try {
    const { type, order } = await req.json();

    if (!type || !order) {
      return NextResponse.json(
        { error: "Missing type or order data" },
        { status: 400 }
      );
    }

    let subject, htmlContent;

    if (type === "confirmation") {
      // Order confirmation email
      subject = `Order Confirmation - ${order.id}`;

      const itemsHtml = order.items
        .map(
          (item) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; text-align: left;">${item.name}</td>
          <td style="padding: 12px; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; text-align: right;">$${(item.basePrice * item.quantity).toFixed(2)}</td>
        </tr>
      `
        )
        .join("");

      htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; }
              .section { background: #f9fafb; padding: 16px; border-radius: 6px; margin-bottom: 16px; }
              .section h2 { margin-top: 0; color: #667eea; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
              table { width: 100%; border-collapse: collapse; margin: 12px 0; }
              .totals { background: white; padding: 16px; border-radius: 6px; }
              .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
              .total-row.final { border-top: 2px solid #667eea; padding-top: 12px; margin-top: 12px; font-size: 18px; font-weight: bold; color: #667eea; }
              .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; }
              .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✅ Order Confirmed!</h1>
              </div>

              <div class="section">
                <h2>Order ID</h2>
                <p style="font-size: 18px; font-weight: bold; color: #667eea; margin: 0;">${order.id}</p>
                <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 12px;">Save this for pickup</p>
              </div>

              <div class="section">
                <h2>Pickup Information</h2>
                <p style="margin: 0;"><strong>Name:</strong> ${order.customerName}</p>
                <p style="margin: 8px 0 0 0;"><strong>Email:</strong> ${order.customerEmail}</p>
                <p style="margin: 8px 0 0 0;"><strong>Phone:</strong> ${order.customerPhone}</p>
              </div>

              <div class="section">
                <h2>Order Items</h2>
                <table>
                  <thead style="background: white;">
                    <tr style="border-bottom: 2px solid #667eea;">
                      <th style="padding: 12px; text-align: left; font-weight: bold;">Item</th>
                      <th style="padding: 12px; text-align: center; font-weight: bold;">Qty</th>
                      <th style="padding: 12px; text-align: right; font-weight: bold;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
              </div>

              <div class="totals">
                <div class="total-row">
                  <span>Subtotal:</span>
                  <span>$${(order.subtotal).toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>Tax (10.2%):</span>
                  <span>$${(order.tax).toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>Processing Fee:</span>
                  <span>$${(order.stripeFee).toFixed(2)}</span>
                </div>
                <div class="total-row final">
                  <span>Total:</span>
                  <span>$${(order.total).toFixed(2)}</span>
                </div>
              </div>

              <div style="text-align: center; background: #f0f4ff; padding: 16px; border-radius: 6px; margin-top: 20px;">
                <p style="margin: 0; font-weight: bold; color: #667eea;">📍 Come pick up your order at Seema Cafe!</p>
                <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 14px;">We'll notify you when it's ready</p>
              </div>

              <div class="footer">
                <p style="margin: 0;">Thank you for ordering from Seema Cafe! 🎉</p>
                <p style="margin: 8px 0 0 0;">Questions? Contact us at (555) 123-4567</p>
              </div>
            </div>
          </body>
        </html>
      `;
    } else if (type === "ready") {
      // Order ready email
      subject = `Your Order is Ready! - ${order.id}`;

      htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; }
              .section { background: #f9fafb; padding: 16px; border-radius: 6px; margin-bottom: 16px; }
              .section h2 { margin-top: 0; color: #10b981; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
              .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Your Order is Ready!</h1>
              </div>

              <div class="section">
                <h2>Order ID</h2>
                <p style="font-size: 18px; font-weight: bold; color: #10b981; margin: 0;">${order.id}</p>
              </div>

              <div style="text-align: center; background: #f0fdf4; padding: 24px; border-radius: 6px; border: 2px solid #10b981; margin: 20px 0;">
                <p style="margin: 0; font-size: 18px; font-weight: bold; color: #10b981;">Come pick up your order at Seema Cafe!</p>
                <p style="margin: 12px 0 0 0; font-size: 16px; color: #059669;">We're waiting for you 😊</p>
              </div>

              <div class="section">
                <h2>Pickup Details</h2>
                <p style="margin: 0;"><strong>Name:</strong> ${order.customerName}</p>
                <p style="margin: 8px 0 0 0;"><strong>Contact:</strong> ${order.customerPhone}</p>
              </div>

              <div class="footer">
                <p style="margin: 0;">Thank you for ordering from Seema Cafe! Enjoy your meal 🍽️</p>
                <p style="margin: 8px 0 0 0;">Questions? Contact us at (555) 123-4567</p>
              </div>
            </div>
          </body>
        </html>
      `;
    } else {
      return NextResponse.json(
        { error: "Invalid email type" },
        { status: 400 }
      );
    }

    await transporter.sendMail({
      from: `"Seema Cafe" <${process.env.EMAIL_USER}>`,
      to: order.customerEmail,
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
