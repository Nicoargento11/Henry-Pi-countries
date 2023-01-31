const { Router } = require("express");
const { Country, TouristActivity } = require("../db");
const {
  getByQuery,
  getAllCountries,
} = require("../controllers/controller_countries");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  const { name } = req.query;

  !name ? getAllCountries(res) : getByQuery(name, res);
});

router.get("/:idCountry", async (req, res) => {
  const { idCountry } = req.params;
  try {
    const getCountry = await Country.findByPk(idCountry, {
      include: TouristActivity,
    });

    return res.status(200).send(getCountry);
  } catch (error) {
    return res.status(400).json({ error: "Country Not Found" });
  }
});

module.exports = router;
