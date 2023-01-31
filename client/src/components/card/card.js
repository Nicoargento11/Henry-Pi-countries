import React from "react";
import { Link } from "react-router-dom";
import Styles from "./card.module.css";

const Card = ({ id, name, flag, continent }) => {
  //renderizo la info de 1 carta
  return (
    <div className={Styles.div_container}>
      <h1>{name}</h1>
      <img className={Styles.img} src={flag} alt={name}></img>

      <div className={Styles.line}></div>
      <h4 className={Styles.detail}>Continent: {continent}</h4>
      <Link className={Styles.link_button_detail} to={`/home/${id}`}>
        <button className={Styles.button_detail}>See all details</button>
      </Link>
    </div>
  );
};

export default Card;
