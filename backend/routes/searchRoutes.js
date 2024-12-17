const express = require("express");
const Match = require("../models/Match");
const Tournament = require("../models/Tournament");

const router = express.Router();

// Route de recherche
router.get("/api/search", async (req, res) => {
  const query = req.query.query.toLowerCase();

  try {
    // Recherche dans les matchs
    const matches = await Match.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    // Recherche dans les tournois
    const tournaments = await Tournament.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    // Combiner les résultats
    const results = [
      ...matches.map((match) => ({ ...match.toJSON(), type: "match" })),
      ...tournaments.map((tournament) => ({
        ...tournament.toJSON(),
        type: "tournament",
      })),
    ];

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la recherche." });
  }
});

module.exports = router;
