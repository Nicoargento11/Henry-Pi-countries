import {
  CHANGE_PAGES,
  GET_COUNTRIES,
  GET_COUNTRY,
  GET_BY_CONTINENT,
  GET_BY_ORDER,
  GET_COUNTRY_DETAIL,
  PAGINATE_CARDS,
  SHOW_LOADING,
  HIDE_LOADING,
  FILTER_BY_ACTIVITY,
  GET_BY_POPULATION,
} from "./actions";
//create initial state
const initialState = {
  allCountries: [],
  continents: [],
  countryDetail: [],
  search: [],
  paginate: [],
  currentPage: 1,
  loading: false,
};

// create reducer
const reducer = (state = initialState, { type, payload }) => {
  const allCountries = [...state.allCountries];
  let searchCountries = [...state.search];

  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: payload,
        continents: payload,
      };
    case GET_BY_CONTINENT:
      const actualCountry = allCountries.filter(
        (country) => country.continent === payload
      );
      return {
        ...state,
        continents: payload === "All" ? allCountries : actualCountry,
        search: payload === "All" ? allCountries : actualCountry,
      };
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: payload,
      };
    case GET_BY_ORDER:
      const ascendent = [...state.continents].sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      const descendent = [...state.continents].sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      return {
        ...state,
        continents: payload === "ascendent" ? ascendent : descendent,
      };
    case GET_BY_POPULATION:
      const max = [...state.continents].sort((a, b) => {
        return b.population - a.population;
      });
      const min = [...state.continents].sort((a, b) => {
        return a.population - b.population;
      });
      return {
        ...state,
        continents: payload === "max" ? max : min,
      };

    case GET_COUNTRY:
      searchCountries = state.search.length
        ? [...state.search]
        : [...state.allCountries];
      return {
        ...state,
        continents: searchCountries.filter((country) =>
          country.name.toLowerCase().includes(payload.toLowerCase())
        ),
      };

    case PAGINATE_CARDS:
      return {
        ...state,
        paginate: payload,
      };

    case CHANGE_PAGES:
      return {
        ...state,
        currentPage: payload,
      };
    case SHOW_LOADING:
      return {
        ...state,
        loading: true,
      };
    case HIDE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case FILTER_BY_ACTIVITY:
      return {
        ...state,
        continents: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
