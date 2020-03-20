const Pet = require("../models/pet.model");
// CRUD
// Create my pet
// Get all my pets
// Find one single pet
// Update Pet
// delete a pet

module.exports.CreatePet = (req, res) => {
  // req.body = {

  // species: String,
  // name: String,
  // age: Number,
  // breed: String,
  // weight: Number,
  // sex: String
  // }
  console.log("Logging the request body in the create function", req.body);
  Pet.create(req.body)
    .then(newPet => res.status(201).json(newPet))
    .catch(err => res.status(500).json(err));
};

module.exports.UpdatePet = (req, res) => {
  console.log("logging the id in the update function", req.params.id);
  Pet.updateOne({ _id: req.params.id }, req.body)
    .then(confirmation => res.status(200).json(confirmation)) // { ok: 1, nModified: 1, nFound: 1 }
    .catch(err => res.status(500).json(err));
};
module.exports.DeletePet = (req, res) => {
  Pet.deleteOne({ _id: req.params.id })
    .then(deleteConfirmation => res.status(200).json(deleteConfirmation)) // { ok: 1, nModified: 1, nFound: 1 }
    .catch(err => res.status(500).json(err));
};
module.exports.FindAllPets = (req, res) => {
  Pet.find()
    .then(allDaPets => res.status(200).json(allDaPets))
    .catch(err => res.status(500).json(err));
};
module.exports.FindOnePet = (req, res) => {
  Pet.findOne({ _id: req.params.id })
    .then(pet => res.status(200).json(pet))
    .catch(err => res.status(500).json(err));
};
