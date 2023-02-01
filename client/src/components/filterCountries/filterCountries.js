import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import {
  getByContinent,
  getByOrder,
  changePages,
  filterByActivity,
  getByPopulation,
} from "../../redux/actions";
import Styles from "./filterCountries.module.css";
import axios from "axios";

const FilterCountries = ({
  getByContinent,
  getByOrder,
  changePages,
  filterByActivity,
  getByPopulation,
}) => {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    let source = CancelToken.source();

    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://henry-pi-countries-production.up.railway.app/activities",
          {
            cancelToken: source.token,
          }
        );
        const response = res.data;
        setActivities(response.allActivities);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log(error);
        }
      }
    };

    fetchData();

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, []);

  const allCountries = useSelector((state) => state.allCountries);
  const continents = Array.from(
    new Set(allCountries?.map((country) => country.continent))
  );
  const activitiesName = Array.from(
    new Set(activities?.map((activity) => activity.name))
  );

  const getByActivity = (value) => {
    let filteredArray = allCountries
      .map((aux) => aux.TouristActivities)
      .flat()
      .filter((activity) => activity.name === value);

    const countriesMatch = allCountries.filter((country) =>
      filteredArray.some(
        (activity) => activity.countriesActivities.CountryId === country.id
      )
    );
    filterByActivity(countriesMatch);
  };

  const handleClick = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    name === "filterBy"
      ? getByContinent(value)
      : name === "orderBy"
      ? getByOrder(value)
      : getByPopulation(value);
    if (name === "filterBy") changePages(1);
    if (!name) {
      getByActivity(value);
      changePages(1);
    }
  };

  return (
    <div className={Styles.big_container}>
      <div className={Styles.container}>
        <h3 className={Styles.filter_background}>Filter by:</h3>
        <div className={Styles.line}>_</div>
        <h5>Name</h5>
        <div>
          <input
            type="radio"
            name="orderBy"
            value="ascendent"
            onClick={handleClick}
          ></input>
          <label>Ascendent</label>
          <input
            type="radio"
            name="orderBy"
            value="descendent"
            onClick={handleClick}
          ></input>
          <label>Descendent</label>
        </div>
        <h5>population</h5>
        <div>
          <input
            type="radio"
            name="population"
            value="max"
            onClick={handleClick}
          ></input>
          <label>Max</label>
          <input
            type="radio"
            name="population"
            value="min"
            onClick={handleClick}
          ></input>
          <label>Min</label>
        </div>
        <div className={Styles.line}>_</div>
        <h5>Activities</h5>
        <select onChange={handleClick} className={Styles.activities}>
          <option value="" className={Styles.option_none}>
            Choose an option
          </option>
          {activitiesName?.map((name, id) => (
            <option value={name} name="countries" key={id}>
              {name}
            </option>
          ))}
        </select>
        <h5>Continents:</h5>
        <input
          type="radio"
          onClick={handleClick}
          name="filterBy"
          value="All"
        ></input>
        <label>All</label>
        {continents.map((continent) => {
          return (
            <div key={continent}>
              <input
                key={continent}
                type="radio"
                onClick={handleClick}
                value={continent}
                name="filterBy"
              ></input>
              <label>{continent}</label>
            </div>
          );
        })}
        <div className={Styles.line}>_</div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getByContinent: (continent) => {
      dispatch(getByContinent(continent));
    },
    getByOrder: (order) => {
      dispatch(getByOrder(order));
    },
    filterByActivity: (countries) => {
      dispatch(filterByActivity(countries));
    },
    getByPopulation: (population) => {
      dispatch(getByPopulation(population));
    },
    changePages: (number) => {
      dispatch(changePages(number));
    },
  };
};
export default connect(null, mapDispatchToProps)(FilterCountries);
