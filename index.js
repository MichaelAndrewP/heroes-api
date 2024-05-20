const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4210;

app.use(express.json());
app.use(cors());

let heroes = [
  { id: 12, name: "Dr. Nice" },
  { id: 13, name: "Bombastica" },
  { id: 14, name: "Celeritasa" },
  { id: 15, name: "Magneta" },
  { id: 16, name: "RubberMan" },
  { id: 17, name: "Dynama" },
  { id: 18, name: "Dr. IQ" },
  { id: 19, name: "Magma" },
  { id: 20, name: "Tornado" },
];

app.get("/api/heroes", (req, res) => {
  res.json(heroes);
});

// TODO: Fix NodeError
app.get("/api/heroes/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const hero = heroes.find((hero) => hero.id === id);
  if (hero) {
    res.json(hero);
  } else {
    res.status(404).send({ error: "Hero not found" });
  }
  res.json(heroes);
});

app.post("/api/heroes", (req, res) => {
  const newHero = req.body;
  newHero.id = genId(heroes);
  heroes.push(newHero);
  res.status(201).json(newHero);
});

app.put("/api/heroes/:id", (req, res) => {
  const heroId = parseInt(req.params.id);
  const updatedHero = req.body;

  const heroIndex = heroes.findIndex((hero) => hero.id === heroId);
  if (heroIndex !== -1) {
    heroes[heroIndex] = { ...heroes[heroIndex], ...updatedHero };
    res.status(200).json(heroes[heroIndex]);
  } else {
    res.status(404).json({ error: "Hero not found" });
  }
});

app.delete("/api/heroes/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const heroIndex = heroes.findIndex((hero) => hero.id === id);
  if (heroIndex !== -1) {
    heroes.splice(heroIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ error: "Hero not found" });
  }
});

function genId(heroes) {
  return heroes.length > 0
    ? Math.max(...heroes.map((hero) => hero.id)) + 1
    : 11;
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
