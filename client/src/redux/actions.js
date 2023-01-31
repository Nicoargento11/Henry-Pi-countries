import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_BY_CONTINENT = "GET_BY_CONTINENT";
export const GET_BY_ORDER = "GET_BY_ORDER";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const PAGINATE_CARDS = "PAGINATE_CARDS";
export const CHANGE_PAGES = "CHANGE_PAGES";
export const SHOW_LOADING = "SHOW_LOADING";
export const HIDE_LOADING = "HIDE_LOADING";
export const GET_BY_POPULATION = "GET_BY_POPULATION";

const url = "http://localhost:3001";

export const getCountries = () => {
  return function (dispatch) {
    dispatch(showLoading());
    fetch(`${url}/countries`)
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: GET_COUNTRIES, payload: data.countries })
      )
      .then(() => dispatch(hideLoading()))
      .catch((error) => alert(error.message));
  };
};

export const getCountryDetail = (id) => {
  return async function (dispatch) {
    try {
      dispatch(showLoading());
      const detailCountry = await axios.get(`${url}/countries/${id}`);
      dispatch({ type: GET_COUNTRY_DETAIL, payload: detailCountry.data });
      dispatch(hideLoading());
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getByContinent = (continent) => {
  return {
    type: GET_BY_CONTINENT,
    payload: continent,
  };
};

export const getByOrder = (order) => {
  return {
    type: GET_BY_ORDER,
    payload: order,
  };
};

export const getCountry = (country) => {
  return {
    type: GET_COUNTRY,
    payload: country,
  };
};

export const getByPopulation = (population) => {
  return {
    type: GET_BY_POPULATION,
    payload: population,
  };
};

export const paginateCards = (cards) => {
  return {
    type: PAGINATE_CARDS,
    payload: cards,
  };
};

export const changePages = (page) => {
  return {
    type: CHANGE_PAGES,
    payload: page,
  };
};

export const filterByActivity = (countries) => {
  return {
    type: FILTER_BY_ACTIVITY,
    payload: countries,
  };
};
export const showLoading = () => ({
  type: SHOW_LOADING,
});

export const hideLoading = () => ({
  type: HIDE_LOADING,
});
