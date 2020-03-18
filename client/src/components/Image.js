import React from "react";
import "../App.css";

/**
 * props = {
 *  "animalPic": "http://tinyurl-jhysdagjklhad.jpg",
 *  "alt": "lol"
 * }
 *
 */
const Image = ({ animalPic, alt }) => (
  <img src={animalPic} alt={alt} className="pic" />
);

export default Image;
