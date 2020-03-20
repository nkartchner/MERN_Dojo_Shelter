const mongoose = require("mongoose");

const ShelterSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Need a name bro....."] },
    address: String,
    phoneNumber: Number,
    email: String,
    password: String,
    capacity: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shelter", ShelterSchema);
