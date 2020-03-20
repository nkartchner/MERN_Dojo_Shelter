const ShelterController = require("../controllers/shelter.controller");

module.exports = function(app) {
  app.get("/api/shelters/all", ShelterController.getAllShelters);
  app.get("/api/shelters/:name", ShelterController.getOneShelter);
  app.get("/api/shelters/:id/pets", ShelterController.getSheltersPets);
  app.put("/api/shelter/update/:id", ShelterController.updateShelter);
  app.post("/api/shelters/new", ShelterController.createShelter);
  app.delete("/api/shelters/delete/:id", ShelterController.deleteShelter);
};
