import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "./AdoptionForm.css";

const INITIAL_FORM_STATE = {
  pet: null,
  owner: {
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    hasOtherPets: false
  },
  shelter: ""
};

const INITIAL_ERROR_STATE = {
  name: null,
  email: null,
  address: null,
  phoneNumber: null
};

const AdoptionForm = props => {
  const [adoptionForm, setAdoptionForm] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState(INITIAL_ERROR_STATE);

  const onChangeHandler = event => {
    setAdoptionForm({
      ...adoptionForm,
      owner: {
        ...adoptionForm.owner,
        [event.target.name]: event.target.value
      }
    });
  };

  const onClickedCheckbox = () => {
    setAdoptionForm({
      ...adoptionForm,
      owner: {
        ...adoptionForm.owner,
        hasOtherPets: !adoptionForm.owner.hasOtherPets
      }
    });
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    axios
      .post("/api/adopt", adoptionForm)
      .then(successResponse => {
        console.log(successResponse);
        setAdoptionForm(INITIAL_FORM_STATE);
      })
      .catch(err =>
        console.log("Something went wrong when creating an adoption", err)
      );
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pets/${props.id}`)
      .then(res => {
        console.log(res);
        // set pet state here
        setAdoptionForm({
          ...adoptionForm,
          pet: res.data
        });
      })
      .catch(err =>
        console.log("Woof woof! Meow meow! There has been an error!", err)
      );
  }, []);

  const validate = e => {
    let errorMsg = "";
    switch (e.target.name) {
      case "name":
        if (e.target.value.length < 2)
          errorMsg += "Must be more than 2 characters ";
        if (e.target.value.length > 500) errorMsg += "Must not be a paragraph ";
        if (e.target.value.includes("@"))
          errorMsg += "This isn't the email field.... duh ";
        if (errorMsg) setErrors({ ...errors, name: errorMsg });
        else setErrors({ ...errors, name: null });
        break;
      case "email":
        const emailReg = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
        if (!emailReg.test(e.target.value)) errorMsg = "Invalid email";
        if (errorMsg) setErrors({ ...errors, email: errorMsg });
        else setErrors({ ...errors, email: null });
        break;
      case "address":
        if (e.target.value.length < 5)
          errorMsg += "Address must be more tha  5 characters";
        if (e.target.value.length > 50)
          errorMsg += "Your address is to long move to a different house";
        if (errorMsg) setErrors({ ...errors, address: errorMsg });
        else setErrors({ ...errors, address: null });
        break;
      case "phoneNumber":
        const phoneReg = new RegExp(/[0-9]{3}[0-9]{3}[0-9]{4}/);
        if (!phoneReg.test(e.target.value)) errorMsg = "Invalid phone number";
        if (errorMsg) setErrors({ ...errors, phoneNumber: errorMsg });
        else setErrors({ ...errors, phoneNumber: null });
        break;
      default:
        return;
    }
  };

  return (
    <div>
      <h1>Adopt a Pet</h1>
      <form className="flexForm" onSubmit={onSubmitHandler}>
        <TextField
          name="name"
          label="Name"
          onBlur={validate}
          className="inputBox"
          helperText={errors.name}
          onChange={onChangeHandler}
          error={Boolean(errors.name)}
          value={adoptionForm.owner.name}
        />
        <TextField
          type="text"
          name="email"
          label="Email"
          onBlur={validate}
          className="inputBox"
          helperText={errors.email}
          onChange={onChangeHandler}
          error={Boolean(errors.email)}
          value={adoptionForm.owner.email}
        />
        <TextField
          type="text"
          name="address"
          label="Address"
          onBlur={validate}
          className="inputBox"
          onChange={onChangeHandler}
          value={adoptionForm.owner.address}
          helperText={errors.address}
          error={Boolean(errors.address)}
        />
        <TextField
          type="tel"
          onBlur={validate}
          name="phoneNumber"
          label="Phone Number"
          className="inputBox"
          onChange={onChangeHandler}
          helperText={errors.phoneNumber}
          error={Boolean(errors.phoneNumber)}
          value={adoptionForm.owner.phoneNumber}
        />
        Has Other Pets:
        <Checkbox
          onBlur={validate}
          name="hasOtherPets"
          checked={adoptionForm.owner.hasOtherPets}
          onChange={onClickedCheckbox}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={Boolean(
            errors.address ||
              errors.email ||
              errors.name ||
              errors.phoneNumber ||
              adoptionForm.owner.address.length === 0 ||
              adoptionForm.owner.email.length === 0 ||
              adoptionForm.owner.name.length === 0 ||
              adoptionForm.owner.phoneNumber.length === 0
          )}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AdoptionForm;
