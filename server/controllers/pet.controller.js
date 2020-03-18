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
    .then(newPet => res.json(newPet))
    .catch(err => res.json(err));
};

module.exports.UpdatePet = (req, res) => {
  console.log("logging the id in the update function", req.params.id);
  Pet.updateOne({ _id: req.params.id }, req.body)
    .then(confirmation => res.json(confirmation)) // { ok: 1, nModified: 1, nFound: 1 }
    .catch(err => res.json(err));
};
module.exports.DeletePet = (req, res) => {
  Pet.deleteOne({ _id: req.params.id })
    .then(deleteConfirmation => res.json(deleteConfirmation)) // { ok: 1, nModified: 1, nFound: 1 }
    .catch(err => res.json(err));
};
module.exports.FindAllPets = (req, res) => {
  Pet.find()
    .then(allDaPets => res.json(allDaPets))
    .catch(err => res.json(err));
};
module.exports.FindOnePet = (req, res) => {
  Pet.findOne({ _id: req.params.id })
    .then(pet => res.json(pet))
    .catch(err => res.json(err));
};
