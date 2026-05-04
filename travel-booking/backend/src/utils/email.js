const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendBookingRequestToAdmin = async (booking, user) => {
  await transporter.sendMail({
    from: `"Travel Booking" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Booking Request Received',
    html: `
      <h2>New Booking Request</h2>
      <p><strong>User:</strong> ${user.name} (${user.email})</p>
      <p><strong>Package:</strong> ${booking.packageName}</p>
      <p><strong>Destination:</strong> ${booking.destination}</p>
      <p><strong>Days:</strong> ${booking.days}</p>
      <p><strong>People:</strong> ${booking.people}</p>
      <p><strong>Budget:</strong> $${booking.budget}</p>
      <p><strong>Package Cost:</strong> $${booking.packageCost}</p>
      <p>Please log in to the admin panel to approve or reject this booking.</p>
    `,
  });
};

const sendApprovalToUser = async (booking, user) => {
  await transporter.sendMail({
    from: `"Travel Booking" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Your Booking Has Been Confirmed!',
    html: `
      <h2>Booking Confirmed!</h2>
      <p>Dear ${user.name},</p>
      <p>Great news! Your booking for <strong>${booking.packageName}</strong> has been approved.</p>
      <p><strong>Destination:</strong> ${booking.destination}</p>
      <p><strong>Duration:</strong> ${booking.packageDuration}</p>
      <p><strong>People:</strong> ${booking.people}</p>
      <p><strong>Total Cost:</strong> $${booking.packageCost}</p>
      <p>We look forward to making your trip unforgettable!</p>
    `,
  });
};

const sendRejectionToUser = async (booking, user) => {
  await transporter.sendMail({
    from: `"Travel Booking" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Update on Your Booking Request',
    html: `
      <h2>Booking Update</h2>
      <p>Dear ${user.name},</p>
      <p>Unfortunately, your booking request for <strong>${booking.packageName}</strong> could not be approved at this time.</p>
      <p>Please feel free to explore other packages or contact us for assistance.</p>
    `,
  });
};

module.exports = { sendBookingRequestToAdmin, sendApprovalToUser, sendRejectionToUser };
