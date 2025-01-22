const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Phed } = require("../model/phedModel");
const { Grampanchayat } = require("../model/gpModel");
const { User } = require("../model/userModel");
const nodemailer = require("nodemailer");

require('dotenv').config();
// controllers/paymentController.js
const Razorpay = require('razorpay');
const crypto = require('crypto');




const userModels = {
  PHED: Phed,
  GP: Grampanchayat,
  USER: User,
};

const loginUser = async (req, res) => {
  try {
    const { userType, id, email, contact, password } = req.body;
    console.log("req.body: ", req.body);

    // Check if required fields are present
    if (!userType || !password || (!id && !email && !contact)) {
      return res
        .status(400)
        .json({ message: "Missing required fields. Please check your input." });
    }

    if (!userModels[userType]) {
      return res.status(400).json({ message: "Invalid user type" });
    }

    const Model = userModels[userType];
    let query = {};

    // Build the query dynamically based on available fields
    if (id) {
      query = {
        $or: [
          { phedId: userType === "PHED" ? id : undefined },
          { lgdCode: userType === "GP" ? id : undefined },
          { consumerId: userType === "USER" ? id : undefined },
        ].filter(Boolean), // Remove undefined values
      };
    } else if (email) {
      query = { email };
    } else if (contact) {
      query = { contact };
    }

    // Query the database
    const user = await Model.findOne(query);
    console.log("user: ", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("isMatch: ", isMatch);

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Prepare the ID to send in the response based on the role
    let responseId;
    if (user.role === "PHED") {
      responseId = user.phedId;
    } else if (user.role === "GP") {
      responseId = user.grampanchayatId;
    } else if (user.role === "USER") {
      responseId = user.consumerId;
    }

    // Send response with user data and token
    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.name}`,
      user: {
        id: responseId,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        contact: user.contact,
      },
      token: token,
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


const editProfile = async (req, res) => {
  try {
    // Log the received request to debug
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    // Extract role and id from the body
    const { role, id } = req.body;
    const profilePicture = req.file?.path;

    // Check for required fields
    if (!role || !id) {
      return res.status(400).json({ message: "Role and ID are required" });
    }

    if (!profilePicture) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Map role to model dynamically
    const model = userModels[role];

    if (!model) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Create the query based on the role
    let query;
    switch (role) {
      case 'PHED':
        query = { phedId: id };
        break;
      case 'GP':
        query = { grampanchayatId: id };
        break;
      case 'USER':
        query = { consumerId: id };
        break;
      default:
        return res.status(400).json({ message: "Invalid role specified" });
    }

    // Find and update the record
    const updatedRecord = await model.findOneAndUpdate(query, { profilePicture }, { new: true });

    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};













const razorpay = new Razorpay({
  key_id: process.env.ROZER_PAY_KEY_ID,
  key_secret: process.env.ROZER_PAY_KEY_SECRET,
});

// Create Order (API)
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // Amount should be in paise (1 INR = 100 paise)

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount / 100, // Convert back to INR
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create Razorpay order' });
  }
};

// Handle Razorpay Payment Success (Callback)
const paymentCallback = (req, res) => {
  const { payment_id, order_id, signature } = req.body;

  const shasum = crypto.createHmac('sha256', process.env.ROZER_PAY_KEY_SECRET);
  shasum.update(order_id + "|" + payment_id);
  const generated_signature = shasum.digest('hex');

  if (generated_signature === signature) {
    res.json({ message: 'Payment success' });
  } else {
    res.status(400).json({ message: 'Payment verification failed' });
  }
};






const logout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Controller to handle password reset using OTP
// const sendOtp = async (req, res) => {
//   try {
//     const { userType, id, email, phoneNumber } = req.body;

//     // Validate input fields
//     if (!userType || (!id && !email) || !phoneNumber) {
//       return res.status(400).json({ message: "Missing required fields. Please check your input." });
//     }

//     if (!['PHED', 'GP', 'USER'].includes(userType)) {
//       return res.status(400).json({ message: "Invalid user type" });
//     }

//     // Construct the query to find the user
//     let query = {};
//     if (userType === "PHED") {
//       query = { phedId: id };
//     } else if (userType === "GP") {
//       query = { lgdCode: id };
//     } else if (userType === "USER") {
//       query = { consumerId: id };
//     }

//     // Find the user by query
//     const user = await User.findOne({ $or: [query, { email: email }] });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate OTP and save to database
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     const otpHash = crypto.createHash("sha256").update(otp.toString()).digest("hex");
//     user.otp = otpHash;
//     user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
//     await user.save();

//     // Send OTP via SMS (using Twilio or another service)
//     await client.messages.create({
//       body: `Your OTP for password reset is ${otp}`,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: phoneNumber,
//     });

//     return res.status(200).json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("Error in sendOtp:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // Controller for OTP verification and password reset
// const verifyOtpAndResetPassword = async (req, res) => {
//   try {
//     const { userType, id, email, phoneNumber, otp, newPassword } = req.body;

//     if (!userType || (!id && !email) || !phoneNumber || !otp || !newPassword) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (!['PHED', 'GP', 'USER'].includes(userType)) {
//       return res.status(400).json({ message: "Invalid user type" });
//     }

//     // Construct the query to find the user
//     let query = {};
//     if (userType === "PHED") {
//       query = { phedId: id };
//     } else if (userType === "GP") {
//       query = { lgdCode: id };
//     } else if (userType === "USER") {
//       query = { consumerId: id };
//     }

//     // Find the user by query
//     const user = await User.findOne({ $or: [query, { email: email }] });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Verify OTP and check expiration
//     const hashedOtp = crypto.createHash("sha256").update(otp.toString()).digest("hex");
//     if (hashedOtp !== user.otp || user.otpExpires < Date.now()) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     // Hash the new password and update it
//     user.password = await bcrypt.hash(newPassword, 10);
//     user.otp = undefined; // Clear OTP
//     user.otpExpires = undefined; // Clear OTP expiration
//     await user.save();

//     return res.status(200).json({ message: "Password reset successful" });
//   } catch (error) {
//     console.error("Error in verifyOtpAndResetPassword:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

const forgotPassword = async (req, res) => {
  try {
    const { userType, id, email, contact } = req.body;
  
    // Check if required fields are present
    if (!userType  || (!id && !email && !contact)) {
      return res
        .status(400)
        .json({ message: "Missing required fields. Please check your input." });
    }

    if (!userModels[userType]) {
      return res.status(400).json({ message: "Invalid user type" });
    }

    const Model = userModels[userType];
    let query = {};

    // Build the query dynamically based on available fields
    if (id) {
      query = {
        $or: [
          { phedId: userType === "PHED" ? id : undefined },
          { lgdCode: userType === "GP" ? id : undefined },
          { consumerId: userType === "USER" ? id : undefined },
        ].filter(Boolean), // Remove undefined values
      };
    } else if (email) {
      query = { email };
    } else if (contact) {
      query = { contact };
    }

    // Find user by contact
    const user = await Model.findOne(query);
    console.log('user: ', user);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a password reset token (valid for 15 minutes)
    const resetToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Email content
    const resetLink = `http://localhost:5173/reset?token=${resetToken}`;
    const emailSubject = "Password Reset Request";
    const emailBody = `
      <h3>Hello ${user.name},</h3>
      <p>You requested to reset your password. Click the link below to reset it:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you did not request this, please ignore this email.</p>
      <p>Thanks,<br>Your Prince :)</p>
    `;

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email provider (Gmail, SendGrid, etc.)
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: emailSubject,
      html: emailBody,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: `Password reset email has been sent to ${user.email}.`,
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    console.log('newPassword: ', password);
    console.log('token: ', token);
   

    // Validate input
    if (!token || !password) {
      return res
        .status(400)
        .json({ message: "Token and new password are required." });
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // Identify user from token payload
    const { id, role } = decoded;

    if (!userModels[role]) {
      return res.status(400).json({ message: "Invalid user role." });
    }

    const Model = userModels[role];
    const user = await Model.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password has been updated successfully.",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ message: "Server error." });
  }
};














module.exports = {
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  editProfile,
  paymentCallback,
  createOrder

};
