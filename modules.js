import express from "express";
import { Locations } from "./tables/locations.js";

const app = express();
app.use(express.json());

// CREATE
app.post("/locations", async (req, res) => {
    const loc = await Locations.create(req.body);
    res.json(loc);
});

// READ all
app.get("/locations", async (req, res) => {
    const list = await Locations.findAll();
    res.json(list);
});

// READ by county
app.get("/locations/judet/:judeti", async (req, res) => {
    const list = await Locations.findAll({
        where: { judeti: req.params.judeti }
    });
    res.json(list);
});

// DELETE
app.delete("/locations/:id", async (req, res) => {
    await Locations.destroy({ where: { id: req.params.id }});
    res.json({ deleted: true });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

export {}