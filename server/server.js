const cors = require("cors");
const express = require("express");
const app = express();
const ShelterRoutes = require("./routes/shelter.routes");
const PetRoutes = require("./routes/pet.routes");

require("./config/mongoose.config");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

ShelterRoutes(app);
PetRoutes(app);

app.listen(8000, () => console.log("The server is running"));
