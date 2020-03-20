import React from "react";
import { Router } from "@reach/router";
import NestedHeader from "../../NestedHeader";
import ShelterReg from "../../Register/ShelterReg";
import PetForm from "../../Pets/PetForm";
import PetsList from "../../Pets/PetsList";
import PetDetails from "../../Pets/PetDetails";
import AdoptionForm from "../../Pets/AdoptionForm";
import ShelterList from "../../Shelter/ShelterList";

const MainRouter = () => {
  return (
    <Router>
      <ShelterList path="shelters/all" />
      <ShelterReg path="register" />
      <PetsList path="pets/all" />
      <PetsList path="pets/all/:shelterId" />
      <PetForm path="pets/add" />
      <PetForm path="pets/edit/:id" />
      <PetDetails path="pets/:id" />
      <AdoptionForm path="pets/adoption/:id" />
    </Router>
  );
};

export default MainRouter;
