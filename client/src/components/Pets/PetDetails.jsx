import axios from "axios";
import { Router, Link } from "@reach/router";
import React, { useState, useEffect } from "react";

const PetDetails = props => {
  const [petDetails, setPetDetails] = useState(null);
  useEffect(() => {
    console.log("Firing the axios method. Here is the props id ==> ", props.id);
    axios
      .get(`http://localhost:8000/api/pets/${props.id}`)
      .then(res => {
        console.log(res);
        setPetDetails(res.data);
      })
      .catch(error =>
        console.log("Something went wrong in the pet details file..... ", error)
      );
  }, []);

  return (
    <div>
      {petDetails !== null ? (
        <div>
          <h1>Adopt {petDetails.name}</h1>
          <img src="#petimage" alt="" />
          <p>Breed: {petDetails.breed}</p>
          <p>Age: {petDetails.age}</p>
          <p>Sex: {petDetails.sex}</p>
          <p>Weight: {petDetails.weight}</p>
          <p>Description: {petDetails.desc}</p>

          <div>
            {/* button to go to adoption screen */}
            <Link to={`/pets/adoption/${petDetails._id}`}>Adopt Me!</Link>
          </div>
        </div>
      ) : (
        <div>...Loading</div>
      )}
    </div>
  );
};
export default PetDetails;
