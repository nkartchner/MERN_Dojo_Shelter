const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
  {
    species: String,
    name: String,
    age: Number,
    breed: String,
    weight: Number,
    sex: String
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
