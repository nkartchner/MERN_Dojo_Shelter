const ShelterController = require("../controllers/shelter.controller");

module.exports = function(app) {
  app.get("/api/shelters", ShelterController.getAllShelters);
  app.get("/api/shelters/:name", ShelterController.getOneShelter);
  app.post("/api/shelters/new", ShelterController.createShelter);
  app.put("/api/shelter/update/:id", ShelterController.updateShelter);
  app.delete("/api/shelters/delete/:id", ShelterController.deleteShelter);
};
