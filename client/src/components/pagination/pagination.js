import React from "react";
import Styles from "./pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changePages } from "../../redux/actions";

const Pagination = ({ cardsPerPage }) => {
  const dispatch = useDispatch();

  const { countries, currentPage } = useSelector((state) => ({
    countries: state.continents,
    currentPage: state.currentPage,
  }));
  // boton next y previous
  const previousPage = () => {
    if (currentPage > 1) dispatch(changePages(currentPage - 1));
  };

  const nextPage = () => {
    if (currentPage < max) dispatch(changePages(currentPage + 1));
  };

  //Total paginas
  let max = Math.ceil(countries.length / cardsPerPage);
  if (max > 20) max = max + 1;

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
