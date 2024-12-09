const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Phed } = require("../model/phedModel");
const { Grampanchayat } = require("../model/gpModel");
const { User } = require("../model/userModel");

const crypto = require("crypto");




const userModels = {
  PHED: Phed,
  GP: Grampanchayat,
  USER: User,
};

const loginUser = async (req, res) => {
  try {
    console.log("Hello World");
    
    const { userType, id, email, password } = req.body;
    console.log('req.body: ', req.body);

    // Check if all required fields are present
    if (!userType && (!id || !email) && !password) {
      return res.status(400).json({ message: "Missing required fields. Please check your input." });
    }

    if (!userModels[userType]) {
      return res.status(400).json({ message: "Invalid user type" });
    }

    const Model = userModels[userType];
    let query = {};

    // Build the query based on userType
    if (userType === "PHED") {
      query = { phedId: id };
    } else if (userType === "GP") {
      query = { lgdCode: id };
    } else if (userType === "USER") {
      query = { consumerId: id };
    }
  

    // Query the database based on the constructed query
    const user = await Model.findOne({ $or: [query, { email: email }] });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log('isMatch: ', isMatch);

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
        id: responseId, // send the appropriate ID based on the role
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
const sendOtp = async (req, res) => {
  try {
    const { userType, id, email, phoneNumber } = req.body;

    // Validate input fields
    if (!userType || (!id && !email) || !phoneNumber) {
      return res.status(400).json({ message: "Missing required fields. Please check your input." });
    }

    if (!['PHED', 'GP', 'USER'].includes(userType)) {
      return res.status(400).json({ message: "Invalid user type" });
    }

    // Construct the query to find the user
    let query = {};
    if (userType === "PHED") {
      query = { phedId: id };
    } else if (userType === "GP") {
      query = { lgdCode: id };
    } else if (userType === "USER") {
      query = { consumerId: id };
    }

    // Find the user by query
    const user = await User.findOne({ $or: [query, { email: email }] });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP and save to database
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpHash = crypto.createHash("sha256").update(otp.toString()).digest("hex");
    user.otp = otpHash;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    await user.save();

    // Send OTP via SMS (using Twilio or another service)
    await client.messages.create({
      body: `Your OTP for password reset is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in sendOtp:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Controller for OTP verification and password reset
const verifyOtpAndResetPassword = async (req, res) => {
  try {
    const { userType, id, email, phoneNumber, otp, newPassword } = req.body;

    if (!userType || (!id && !email) || !phoneNumber || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!['PHED', 'GP', 'USER'].includes(userType)) {
      return res.status(400).json({ message: "Invalid user type" });
    }

    // Construct the query to find the user
    let query = {};
    if (userType === "PHED") {
      query = { phedId: id };
    } else if (userType === "GP") {
      query = { lgdCode: id };
    } else if (userType === "USER") {
      query = { consumerId: id };
    }

    // Find the user by query
    const user = await User.findOne({ $or: [query, { email: email }] });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify OTP and check expiration
    const hashedOtp = crypto.createHash("sha256").update(otp.toString()).digest("hex");
    if (hashedOtp !== user.otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash the new password and update it
    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined; // Clear OTP
    user.otpExpires = undefined; // Clear OTP expiration
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in verifyOtpAndResetPassword:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  sendOtp,
  verifyOtpAndResetPassword,
};















module.exports = {
  loginUser,
  logout,
};
