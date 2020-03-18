const Shelter = require("../models/shelter.model");

// ALL CRUD STUFF GOES HERE

// CREATE
// UPDATE
// READ ALL
// READ 1
// DELETE

module.exports.createShelter = (request, response) => {
  console.log(request.body);
  Shelter.create(request.body)
    .then(newShelter => response.json(newShelter))
    .catch(err => response.json(err));
};

module.exports.getAllShelters = (req, res) => {
  Shelter.find()
    .then(allShelters => res.json(allShelters))
    .catch(err => res.json(err));
};

module.exports.getOneShelter = (req, res) => {
  Shelter.findOne({ name: req.params.name })
    .then(shelter => res.json(shelter))
    .catch(err => res.json(err));
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
      return res.json(confirmation);
    })
    .catch(err => res.json(err));
};

module.exports.deleteShelter = (req, res) => {
  Shelter.deleteOne({ _id: req.params.id })
    .then(confirmation => {
      console.log(
        "Confirming that the shelter was successfully deleted.",
        confirmation
      );
      return res.json(confirmation);
    })
    .catch(err => res.json(err));
};
