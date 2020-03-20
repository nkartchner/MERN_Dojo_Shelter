const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  address: String,
  phoneNumber: String,
  hasOtherPets: Boolean
});

const AdoptionSchema = new mongoose.Schema(
  {
    owner: OwnerSchema,
    petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    shelterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelter",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Adoption", AdoptionSchema);
