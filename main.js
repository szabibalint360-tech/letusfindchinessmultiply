import express from 'express';

import { Locations,  } from './tables/locations.js';
import { 
    createLocation,
    getAllLocations,
    getLocationsByJudet,
    deleteLocation 
} from './methods.api.js';

import { 
    createRisk,
    getAllRisks,
    getRiskById,
    getRisksBySatRel,
    updateRisk,
    deleteRisk
}from './methods.api.js';

const app = express();
const PORT = 8080;

//risks 
app.post("/risks", createRisk);
app.get("/risks", getAllRisks);
app.get("/risks/:id", getRiskById);
app.get("/risks/satrel/:satRel", getRisksBySatRel);
app.put("/risks/:id", updateRisk);
app.delete("/risks/:id", deleteRisk);
// CREATE
app.post("/locations", createLocation);
// READ all
app.get("/locations", getAllLocations);
// READ by county
app.get("/locations/judet/:judeti", getLocationsByJudet);
// DELETE
app.delete("/locations/:id", deleteLocation);


app.get('/locations/bulcreate', async (req, res) => {
    await Locations.bulkCreate([
    { id:1,judeti: "CLUJ", locatie: "TURDA", numLoc: 47000 },
    { id:2,judeti: "CLUJ", locatie: "DEJ", numLoc: 33000 },
    { id:3,judeti: "BIHOR", locatie: "ORADEA", numLoc: 196367 }
]);
 res.status(200).send("bombocla avem turda")
})

app.listen(PORT,() => console.log(`test api on http://localhost:${PORT}`))