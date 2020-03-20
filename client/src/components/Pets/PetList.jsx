import React, { useState, useEffect } from "react";
import { Router, Link } from "@reach/router";
import axios from "axios";

const PetList = () => {
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets/all")
      .then(res => {
        console.log(res);
        setPetList(res.data);
      })
      .catch(err => {
        console.log("something went wrong in PetList.jsx", err);
      });
  }, []);

  return (
    <div>
      {petList.map(pet => (
        <p key={pet._id}>
          {pet.species}, {pet.name}, {pet.age}, {pet.breed}, {pet.weight},{" "}
          {pet.sex}
          <Link to={`/pets/${pet._id}`}>Pet Detail</Link>
          {/* <Link to={`/pets/adoption/${pet._id}`}>Adopt Pet</Link> */}
        </p>
      ))}
    </div>
  );
};

export default PetList;
