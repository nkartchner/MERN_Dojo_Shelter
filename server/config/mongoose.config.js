const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/pet_shelter", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true }).then(() => console.log("Database is connected!")).catch(() => console.log("Could not connect to the DB!"))