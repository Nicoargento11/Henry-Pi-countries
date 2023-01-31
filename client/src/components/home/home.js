/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getCountries, paginateCards } from "../../redux/actions";
import Cards from "../cards/cards";
import NavBar from "../navbar/navbar";
import Pagination from "../pagination/pagination";
import FilterCountries from "../filterCountries/filterCountries.js";
import Styles from "./home.module.css";
import Loader from "../loader/loader";

function Home({ getCountries, paginateCards }) {
  let [cardsPerPage] = useState(10);

  useEffect(() => {
    getCountries();
  }, []);

  //Paginate variables
  const currentPage = useSelector((state) => state.currentPage);
  const countries = useSelector((state) => state.continents);
  const loading = useSelector((state) => state.loading);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  let currentCards =
    currentPage === 1
      ? countries.slice(indexOfFirstCard, indexOfLastCard - 1)
      : countries.slice(indexOfFirstCard - 1, indexOfLastCard - 1);

  useEffect(() => {
    paginateCards(currentCards);
  }, [currentCards]);
  return (
    <>
      <NavBar></NavBar>
      {loading ? (
        <Loader />
      ) : (
        <div className={Styles.container}>
          <FilterCountries></FilterCountries>
          <div className={Styles.cards_paginate}>
            <h1>All countries</h1>
            <Cards />
            <Pagination cardsPerPage={cardsPerPage} />
          </div>
        </div>
      )}
    </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: () => {
      dispatch(getCountries());
    },
    paginateCards: (cards) => {
      dispatch(paginateCards(cards));
    },
  };
};

export default connect(null, mapDispatchToProps)(Home);
