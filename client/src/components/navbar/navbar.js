import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePages, getCountry } from "../../redux/actions";
import Styles from "./navbar.module.css";

const NavBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const value = event.target.value;
    setName(value);
    dispatch(getCountry(name));
    dispatch(changePages(1));
  };

  return (
    <div className={Styles.navbar_container}>
      <div className={Styles.tittle_container}>
        <div className={Styles.tittle_background}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2072/2072130.png "
            alt="earth"
            className={Styles.img}
          ></img>
          <h2>Mini-World</h2>
        </div>
      </div>
      <div className={Styles.navbar_content}>
        <Link to={"/activities"}>
          <button className={Styles.button_activity}>Create Activity</button>
        </Link>
        <input
          onChange={handleChange}
          value={name}
          type="text"
          placeholder="search..."
          className={Styles.input_search}
        />
      </div>
    </div>
  );
};

export default NavBar;
