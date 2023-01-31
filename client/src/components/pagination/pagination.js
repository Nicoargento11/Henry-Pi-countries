import React from "react";
import Styles from "./pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changePages } from "../../redux/actions";

const Pagination = ({ cardsPerPage }) => {
  const dispatch = useDispatch();
  // const countries = useSelector((state) => state.continents);
  // const currentPage = useSelector((state) => state.currentPage);
  const { countries, currentPage } = useSelector((state) => ({
    countries: state.continents,
    currentPage: state.currentPage,
  }));

  const previousPage = () => {
    if (currentPage > 1) dispatch(changePages(currentPage - 1));
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(countries.length / cardsPerPage))
      dispatch(changePages(currentPage + 1));
  };

  //Total pages
  const pageNumbers = [];
  const max = Math.ceil(countries.length / cardsPerPage);
  for (let i = 1; i <= Math.ceil(countries.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className={Styles.div_buttons}>
        <button className={Styles.button} onClick={() => previousPage()}>
          Previous Page
        </button>
        <input
          className={Styles.button_input}
          value={currentPage}
          onChange={() => {}}
        />
        <p className={Styles.button_input}>of {max}</p>
        <button className={Styles.button} onClick={() => nextPage()}>
          Next Page
        </button>
      </div>
    </>
  );
};

export default Pagination;
