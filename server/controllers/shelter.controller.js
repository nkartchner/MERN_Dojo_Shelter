const Shelter = require("../models/shelter.model");

// ALL CRUD STUFF GOES HERE

// CREATE
// UPDATE
// READ ALL
// READ 1
// DELETE

module.exports.createShelter = (request, response) => {
  Shelter.create(request.body)
    .then(newShelter => response.status(201).json(newShelter))
    .catch(err => response.status(500).json(err));
};

module.exports.getAllShelters = (req, res) => {
  Shelter.find()
    .then(allShelters => res.status(200).json(allShelters))
    .catch(err => res.status(500).json(err));
};

module.exports.getOneShelter = (req, res) => {
  Shelter.findOne({ name: req.params.name })
    .then(shelter => res.status(200).json(shelter))
    .catch(err => res.status(500).json(err));
};

module.exports.updateShelter = (req, res) => {
  console.log("Logging the shelter update data. ", req.body);
  console.log(
    "Logging the params from the shelter update function. ",
    req.params
  );
  Shelter.updateOne({ _id: req.params.id }, req.body)
    .then(confirmation => {
      console.log("Logging the update confirmation", confirmation);
      return res.status(200).json(confirmation);
    })
    .catch(err => res.status(500).json(err));
};

module.exports.deleteShelter = (req, res) => {
  Shelter.deleteOne({ _id: req.params.id })
    .then(confirmation => {
      console.log(
        "Confirming that the shelter was successfully deleted.",
        confirmation
      );
      return res.status(200).json(confirmation);
    })
    .catch(err => res.status(500).json(err));
};

module.exports.getSheltersPets = (req, res) => {
  Shelter.findOne({ _id: req.params.shelterId })
    .then(shelter => res.status(200).json(shelter.pets))
    .catch(err => res.status(500).json(err));
};
