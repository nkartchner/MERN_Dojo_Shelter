// ! Dylan
// ! Zac

import React, { useState } from "react";
import axios from "axios";
import faker from "faker";

const Initial_form_state = {
  name: faker.company.companyName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  address: faker.address.streetAddress(),
  phoneNumber: faker.phone.phoneNumber("##########"),
  capacity: faker.random.number(),
  submitted: false
};

const ShelterReg = props => {
  const [shelterReg, setShelterReg] = useState(Initial_form_state);

  const onChangeHandler = event => {
    setShelterReg({
      ...shelterReg,
      [event.target.name]: event.target.value
    });
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    setShelterReg({
      ...Initial_form_state,
      submitted: true
    });

    axios
      .post("http://localhost:8000/api/shelters/new", shelterReg)
      .then(newShelter => props.navigate("/shelters/all"))
      .catch(error => console.log("wooooo", error));
  };

  return (
    <div>
      <h1>Shelter Registration Form</h1>
      <form>
        <p>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={onChangeHandler}
            value={shelterReg.name}
          />
        </p>
        <p>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            onChange={onChangeHandler}
            value={shelterReg.email}
          />
        </p>
        <p>
          <label>Password:</label>
          <input
            type="text"
            name="password"
            onChange={onChangeHandler}
            value={shelterReg.password}
          />
        </p>
        <p>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            onChange={onChangeHandler}
            value={shelterReg.address}
          />
        </p>
        <p>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            onChange={onChangeHandler}
            value={shelterReg.phoneNumber}
          />
        </p>
        <p>
          <label>Capacity:</label>
          <input
            type="text"
            name="capacity"
            onChange={onChangeHandler}
            value={shelterReg.capacity}
          />
        </p>
        <button className="button" onClick={onSubmitHandler}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ShelterReg;
