const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid"); // Import uuid for unique ID generation

// PHED Schema
const PhedSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contact: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  phedId: { type: String, required: true, unique: true },
  role: { type: String, default: "PHED" },
  profilePicture: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/022/450/297/original/3d-minimal-purple-user-profile-avatar-icon-in-circle-white-frame-design-vector.jpg",
  },
  alert: [   { type: mongoose.Schema.Types.ObjectId, ref: 'GpComplaint' },

  ],
  
  announcement: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PhedAnnouncement",
      index: true,
    },
  ],
  gpList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gp", index: true }],
  requestFund: [
    { type: mongoose.Schema.Types.ObjectId, ref: "FundRequest", index: true },
  ],
  firebaseToken: String,

  phedAssest: [{ type: mongoose.Schema.Types.ObjectId, ref: "Asset" }],
  phedInventory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Inventory" }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Phed Announcement Schema
const PhedAnnouncementSchema = new mongoose.Schema({
  lgdCode: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Phed = mongoose.model("Phed", PhedSchema);
const PhedAnnouncement = mongoose.model(
  "PhedAnnouncement",
  PhedAnnouncementSchema
);

module.exports = { Phed, PhedAnnouncement };
