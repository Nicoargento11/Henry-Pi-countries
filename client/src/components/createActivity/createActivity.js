/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Styles from "./createActivity.module.css";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "./validation";
import { getCountries } from "../../redux/actions";
import Loader from "../loader/loader";

const CreateActivity = () => {
  // traigo todos los paises para usarlo en el select
  const AllCountries = useSelector((state) => state.allCountries);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  // cada que se actualiza dispatch cargame el store
  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  //guardo los valores para madarlo al post
  const [form, setForm] = useState({
    name: "",
    difficulty: 0,
    season: "",
    duration: 60,
    countries: [],
  });
  // guardo los valores para verificarlos en validation
  const [errors, setErrors] = useState({
    name: "",
    countries: [],
    difficulty: "",
  });

  // al mandar los datos que me redirija al home
  const [succes, setSucces] = useState(false);

  // funcion para guardar los valores en el estado
  // const handleClick = () => {};
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: name === "countries" ? [...form.countries, value] : value,
    });

    setErrors(
      validate({
        ...form,
        [name]: name === "countries" ? [...form.countries, value] : value,
      })
    );
  };

  const handleDelete = (name) => {
    setForm({
      ...form,
      countries: form.countries.filter((country) => country !== name),
    });
  };
  // al hacer submit del form mando el post con los datos del estado
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!errors.name && !errors.countries) {
        await axios.post(
          "https://henry-pi-countries-production.up.railway.app/activities",
          form
        );
        setSucces(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      {succes && <Redirect to="/home" />}
      {loading ? (
        <Loader />
      ) : (
        <div className={Styles.div_form}>
          <div className={Styles.background}>
            <div className={Styles.tittle_top}>
              <h1>Create Activity</h1>
              <Link to={"/home"}>
                <button className={Styles.button_back}>X</button>
              </Link>
            </div>
            <form onSubmit={handleSubmit} className={Styles.form_container}>
              <div className={Styles.form}>
                <div className={Styles.form_label}>
                  <label className={Styles.label}>Name Activity</label>
                  <input
                    placeholder="Activity..."
                    name="name"
                    onChange={handleChange}
                    className={
                      errors.name ? Styles.errors_input : Styles.form_input
                    }
                  />
                  {errors.name && <p className={Styles.error}>{errors.name}</p>}
                </div>

                <div className={Styles.form_label}>
                  <label className={Styles.label}>Difficulty</label>
                  <input
                    placeholder="Difficulty..."
                    name="difficulty"
                    type="number"
                    min="1"
                    max="5"
                    onChange={handleChange}
                    className={Styles.form_input}
                  />
                  {errors.difficulty && (
                    <p className={Styles.error}>{errors.difficulty}</p>
                  )}
                </div>

                <div className={Styles.form_label}>
                  <label className={Styles.label}>season</label>
                  <select
                    name="season"
                    onChange={handleChange}
                    className={Styles.form_input}
                  >
                    <option value="" className={Styles.option_none}>
                      Choose an option
                    </option>
                    <option value="Winter">Winter</option>
                    <option value="Autumn">Autumn</option>
                    <option value="Summer">Summer</option>
                    <option value="Spring">Spring</option>
                  </select>
                </div>

                <div className={Styles.form_label}>
                  <label className={Styles.label}>Duration</label>
                  <input
                    type="range"
                    placeholder="Duration..."
                    name="duration"
                    min="1"
                    max="120"
                    value={form.duration}
                    id="duration"
                    onChange={handleChange}
                    className={Styles.form_input}
                  />
                  <output htmlFor="duration" className={Styles.output_duration}>
                    {form.duration}
                  </output>
                </div>
                <div className={Styles.form_label}>
                  <label className={Styles.label}>Countries</label>

                  <select
                    className={
                      errors.countries ? Styles.errors_input : Styles.form_input
                    }
                    onChange={handleChange}
                    name="countries"
                  >
                    <option value="" className={Styles.option_none}>
                      Choose an option
                    </option>
                    {AllCountries?.map((name) => (
                      <option value={name.id} name="countries" key={name.name}>
                        {name.name}
                      </option>
                    ))}
                  </select>
                  {errors.countries && (
                    <p className={Styles.error}>{errors.countries}</p>
                  )}
                </div>
                <div className={Styles.button_container}>
                  <button className={Styles.form_button_submmit} type="submit">
                    SUBMIT
                  </button>
                </div>
              </div>
              <div className={Styles.select_country}>
                {form.countries.map((country, id) => (
                  <div key={id} className={Styles.select_country_content}>
                    {country}
                    <button
                      className={Styles.select_country_button}
                      onClick={() => handleDelete(country)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateActivity;
