const { Router } = require("express");
const createActivity = require("../controllers/controller_activities");
const { TouristActivity, Country } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  try {
    const allActivities = await TouristActivity.findAll({
      include: [
        {
          model: Country,
          attributes: ["id", "name"], 
        },
      ],
    });
    res.status(200).json({ allActivities });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const activity = await createActivity(req.body);
    res.status(200).json({ activity });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
