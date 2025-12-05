import express from 'express';

import { Locations,  } from './tables/locations.js';

const app = express();
const PORT = 8080;

<<<<<<< HEAD

app.get('/locations', async (req, res) => {
    await Locations.bulkCreate([
    { judeti: "CLUJ", locatie: "TURDA", numLoc: 47000 },
    { judeti: "CLUJ", locatie: "DEJ", numLoc: 33000 },
    { judeti: "BIHOR", locatie: "ORADEA", numLoc: 196367 }
]);
 res.status(200).send("bombocla avem turda")
})
=======
app.post('AddCity', AddCity);


app.post('AddRisk', AddRisk);


app.use(express.json())
>>>>>>> 890675a (api function prototypes)

app.listen(PORT,() => console.log(`test api on http://localhost:${PORT}`))