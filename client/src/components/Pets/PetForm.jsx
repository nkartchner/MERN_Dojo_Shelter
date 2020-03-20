import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import axios from "axios";
import faker from "faker";
import "./AdoptionForm.css";

const species = ["Dog", "Bird", "Cat", "Human"];

const initial_state = {
  species: species[Math.floor(Math.random() * species.length)],
  speciesError: null,
  name: faker.name.firstName(),
  nameError: null,
  age: faker.random.number(15),
  ageError: null,
  breed: "Husky",
  breedError: null,
  weight: faker.random.number(30),
  weightError: null,
  sex: "female",
  sexError: null,
  desc: faker.lorem.paragraphs(3),
  descError: null,
  submitted: false
};

const initial_error_state = {
  species: null,
  name: null,
  age: null,
  breed: null,
  weight: null,
  sex: null,
  desc: null,
  submitted: null
};
//api/pets/update/:id
const PetForm = props => {
  const [formState, setFormState] = useState(initial_state);
  const [errors, setErrors] = useState(initial_error_state);
  const [editState, setEditState] = useState(Boolean(props.id));
  // const [editState, setEditState] = useState("id" in props);
  // const [editState, setEditState] = useState(!!props.id);

  useEffect(() => {
    if (props.id) {
      // Make an axios call to get the pet
      axios
        .get(`http://localhost:8000/api/pets/${props.id}`)
        .then(function(res) {
          setFormState(res.data);
        })
        .catch(err => console.log("error in useEffect in addPetForm.jsx", err));
      // and set the formState to the pet info
    }
  }, []);

  const onChangeHandler = event => {
    event.preventDefault();
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    if (!props.id) {
      axios
        .post("http://localhost:8000/api/pets/new", formState)
        .then(newPet => {
          console.log(newPet);
          props.navigate(`/pets/${newPet.data._id}`);
        })
        .catch(err =>
          console.log(
            "Something went wrong at your axios call in addPetForm",
            err
          )
        );
    } else {
      axios
        .put("http://localhost:8000/api/pets/update/" + props.id, formState)
        .then(() => props.navigate(`/pets/${props.id}`))
        .catch(err =>
          console.log(
            `Error updating Document id ${props.id} in the Collection`,
            err
          )
        );
    }
  };

  return (
    <div>
      <h1>{editState ? "Edit" : "Add"} Pet Form</h1>
      {formState.submitted && "Thank you for adding your pet!"}
      <form className="flexForm" onSubmit={onSubmitHandler}>
        <TextField
          label="Species"
          variant="filled"
          type="text"
          name="species"
          className="inputBox"
          error={formState.species.length > 0 && formState.species.length < 2}
          helperText="Must be at least 2 Characters!"
          onChange={onChangeHandler}
          value={formState.species}
        />
        <TextField
          label="Name"
          name="name"
          type="text"
          value={formState.name}
          error={formState.name.length > 0 && formState.name.length < 2}
          helperText="Must be at least 2 Characters!"
          variant="filled"
          className="inputBox"
          onChange={onChangeHandler}
        />
        <TextField
          label="Age"
          name="age"
          type="text"
          value={formState.age}
          error={isNaN(formState.age)}
          helperText="Age must be a number"
          variant="filled"
          className="inputBox"
          onChange={onChangeHandler}
        />
        <TextField
          label="Breed"
          value={formState.breed}
          error={formState.breed.length > 0 && formState.breed.length < 2}
          type="text"
          name="breed"
          helperText="Must be at least 2 Characters!"
          variant="filled"
          className="inputBox"
          onChange={onChangeHandler}
        />
        <TextField
          label="Weight"
          value={formState.weight}
          type="text"
          error={isNaN(formState.weight)}
          helperText="Weight must be a number"
          name="weight"
          variant="filled"
          className="inputBox"
          onChange={onChangeHandler}
        />

        <TextField
          label="Description"
          multiline
          value={formState.desc}
          type="text"
          name="desc"
          variant="filled"
          className="inputBox"
          onChange={onChangeHandler}
        />

        <Select
          value={formState.sex}
          name="sex"
          label="Sex"
          className="inputBox"
          onChange={onChangeHandler}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>

        <Button color="primary">Submit</Button>
      </form>
    </div>
  );
};

export default PetForm;
