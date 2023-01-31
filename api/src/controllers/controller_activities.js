const { TouristActivity } = require("../db");

const createActivity = async ({
  name,
  difficulty,
  season,
  duration,
  countries,
}) => {
  const createActivity = await TouristActivity.create({
    name,
    difficulty,
    season,
    duration,
  });
  await createActivity.setCountries(countries);

  return createActivity;
};

module.exports = createActivity;
