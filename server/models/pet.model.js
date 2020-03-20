const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
  {
    species: String,
    name: String,
    age: Number,
    breed: String,
    weight: Number,
    sex: String,
    desc: String,
    adopted: {
      type: Boolean,
      default: false
    },
    shelterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelter",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", PetSchema);
