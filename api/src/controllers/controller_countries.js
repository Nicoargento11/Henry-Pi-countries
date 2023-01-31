const axios = require("axios");
const { Country, TouristActivity } = require("../db");

const getAllFilterData = async () => {
  const getApi = await axios.get("https://restcountries.com/v3/all");
  const dataCountries = getApi.data;
  const allCountries = dataCountries.map((country) => {
    return {
      id: country.cca3,
      name: country.name.common,
      flag: country.flags[0],
      continent: country.continents[0],
      capital: country.capital ? country.capital : "Not Found",
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    };
  });
  return allCountries;
};

const getAllCountries = async (res) => {
  const allCountries = await getAllFilterData();
  try {
    const count = await Country.count();
    if (!count) {
      await Country.bulkCreate(allCountries);
    }
    const countries = await Country.findAll({
      include: [
        {
          model: TouristActivity,
          attributes: ["name"],
        },
      ],
    });

    return res.status(200).json({ countries });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const getByQuery = async (name, res) => {
  const allCountries = await getAllFilterData();

  try {
    const countryQuery = allCountries.filter((country) =>
      country.name.toLowerCase().includes(name.toLowerCase())
    );
    if (!countryQuery.length) throw Error();
    return res.status(200).json({ countryQuery });
  } catch (error) {
    return res.status(404).json({ message: "Country Not Found" });
  }
};

module.exports = { getAllFilterData, getByQuery, getAllCountries };
