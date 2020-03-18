const PetController = require("../controllers/pet.controller");

module.exports = function(app) {
  app.post("/api/pets/new", PetController.CreatePet);
  app.put("/api/pets/update/:id", PetController.UpdatePet);
  app.delete("/api/pets/delete/:id", PetController.DeletePet);
  app.get("/api/pets/all", PetController.FindAllPets);
  app.get("/api/pets/:id", PetController.FindOnePet);
};
