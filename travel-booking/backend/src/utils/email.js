const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send booking request to admin
const sendBookingRequestToAdmin = async (booking, user) => {
  try {
    await transporter.sendMail({
      from: `"Travel Booking" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '🎫 New Booking Request Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #aa3bff;">New Booking Request</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>User:</strong> ${user.name} (${user.email})</p>
            <p><strong>Package:</strong> ${booking.packageName}</p>
            <p><strong>Destination:</strong> ${booking.destination}</p>
            <p><strong>Duration:</strong> ${booking.days} days</p>
            <p><strong>People:</strong> ${booking.people}</p>
            <p><strong>Budget:</strong> $${booking.budget}</p>
            <p><strong>Package Cost:</strong> $${booking.packageCost}</p>
          </div>
          <p>Please log in to the admin panel to approve or reject this booking.</p>
        </div>
      `,
    });
    console.log('✅ Admin notification email sent');
  } catch (error) {
    console.error('❌ Failed to send admin email:', error.message);
  }
};

// Send approval email to user
const sendApprovalToUser = async (booking, user) => {
  try {
    await transporter.sendMail({
      from: `"Travel Booking" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: '✅ Your Booking Has Been Confirmed!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">🎉 Booking Confirmed!</h2>
          <p>Dear ${user.name},</p>
          <p>Great news! Your booking has been approved.</p>
          <div style="background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Package:</strong> ${booking.packageName}</p>
            <p><strong>Destination:</strong> ${booking.destination}</p>
            <p><strong>Duration:</strong> ${booking.packageDuration}</p>
            <p><strong>People:</strong> ${booking.people}</p>
            <p><strong>Total Cost:</strong> $${booking.packageCost}</p>
          </div>
          <p>We look forward to making your trip unforgettable!</p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">Best regards,<br>TravelEase Team</p>
        </div>
      `,
    });
    console.log('✅ Approval email sent to user');
  } catch (error) {
    console.error('❌ Failed to send approval email:', error.message);
  }
};

// Send rejection email to user
const sendRejectionToUser = async (booking, user) => {
  try {
    await transporter.sendMail({
      from: `"Travel Booking" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: '📋 Update on Your Booking Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ef4444;">Booking Update</h2>
          <p>Dear ${user.name},</p>
          <p>Unfortunately, your booking request for <strong>${booking.packageName}</strong> could not be approved at this time.</p>
          <div style="background: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Package:</strong> ${booking.packageName}</p>
            <p><strong>Destination:</strong> ${booking.destination}</p>
          </div>
          <p>Please feel free to explore other packages or contact us for assistance.</p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">Best regards,<br>TravelEase Team</p>
        </div>
      `,
    });
    console.log('✅ Rejection email sent to user');
  } catch (error) {
    console.error('❌ Failed to send rejection email:', error.message);
  }
};

module.exports = { sendBookingRequestToAdmin, sendApprovalToUser, sendRejectionToUser };
