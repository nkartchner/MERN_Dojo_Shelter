const mongoose = require("mongoose");
const Pet = require("./pet.model");

/*
 *  
 * This Schema will NOT become a model. 
 * It will just be used to define what 
 * goes in the "Owner" field
 * for the AdoptionSchema
 * 
 */

const OwnerSchema = new mongoose.Schema({
  // Making the name required
  name: { type: String, required: true },
  email: String,
  address: String,
  // Making Social Security Number Required
  SSN: { type: String, required: true },
  // Making Credit Card Number Required
  CCN: { type: String, required: true }
});

/*
 *  
 * This Schema will NOT become a model. 
 * It will just be used to define what 
 * goes in the "adoptions" field
 * for the Shelter
 * 
 */ 
const AdoptionSchema = new mongoose.Schema(
  {
    /**
     *  
     * Making it so in order to add an adoption to
     * you must pass and entire pet and an entire owner
     * 
     */
    pet: { type: Pet.schema, required: true },
    owner: { type: OwnerSchema, required: true }
  },
  // Timestamps: true - automatically adds the "createdAt" 
  // and "updatedAt" fields to your schema
  { timestamps: true }
);

const ShelterSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    phoneNumber: Number,
    email: String,
    password: String,
    capacity: Number,
    adoptions: [AdoptionSchema]
  },
  { timestamps: true }
);

const Shelter = mongoose.model("Shelter", ShelterSchema);
module.exports = Shelter;

/**
 * SHELTER MODEL
 * name
 * address
 * phoneNumber
 * email
 * password
 * capacity
 * pets
 * adoptions?
 */
