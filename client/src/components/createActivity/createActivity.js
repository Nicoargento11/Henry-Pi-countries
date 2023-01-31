import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Styles from "./createActivity.module.css";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { validate } from "./validation";

const CreateActivity = () => {
  // traigo todos los paises para usarlo en el select
  const getCountries = useSelector((state) => state.allCountries);

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
  });

  // al mandar los datos que me redirija al home
  const [succes, setSucces] = useState(false);

  // funcion para guardar los valores en el estado
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

  // al hacer submit del form mando el post con los datos del estado
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!errors.name && !errors.countries) {
        await axios.post("http://localhost:3001/activities", form);
        setSucces(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      {succes ? (
        <Redirect to="/home" />
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
                    {getCountries?.map((name) => (
                      <option value={name.id} name="countries" key={name.id}>
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
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateActivity;
