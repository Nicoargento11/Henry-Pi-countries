/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getCountryDetail } from "../../redux/actions";
import Styles from "./detailCountries.module.css";

const DetailCountries = () => {
  const { detailId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountryDetail(detailId));
  }, []);
  const detail = useSelector((state) => state.countryDetail);
  return (
    <>
      <div className={Styles.div_center_container}>
        <div className={Styles.div_container}>
          <Link to={"/activities"}>
            <button className={Styles.button}>Create Activity</button>
          </Link>
          <Link to={"/home"}>
            <button className={Styles.button}>BACK</button>
          </Link>
          <div className={Styles.div_img}>
            <img
              className={Styles.img}
              src={detail.flag}
              alt={detail.name}
            ></img>
            <h3 className={Styles.id}>{detail.id}</h3>
          </div>
          <div className={Styles.div_information}>
            <div className={Styles.information}>
              <h3 className={Styles.text}>Country:</h3>
              <h3>{detail.name}</h3>
              <h3 className={Styles.text}>Capital:</h3>
              <h3>{detail.capital}</h3>
              <h3 className={Styles.text}>Subregion:</h3>
              <h3>{detail.subregion}</h3>
            </div>
            <div className={Styles.information}>
              <h3 className={Styles.text}>Continent:</h3>
              <h3>{detail.continent}</h3>
              <h3 className={Styles.text}>Population:</h3>
              <h3>{detail.population}</h3>
              <h3 className={Styles.text}>area:</h3>
              <h3>{detail.area} Km2</h3>
            </div>
          </div>
        </div>
        <div className={Styles.div_container}>
          <h1>Activities</h1>
          {detail.TouristActivities?.length ? (
            detail.TouristActivities?.map(({ name, season, duration, id }) => (
              <div key={id} className={Styles.div_activities}>
                <h3>Activity: {name}</h3>
                <h3>Season: {season}</h3>
                {duration > 1 ? (
                  <h3>Duration: {duration} minutes</h3>
                ) : (
                  <h3>Duration: {duration} minute</h3>
                )}
              </div>
            ))
          ) : (
            <div>"No activities yet"</div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailCountries;
