import express from 'express';

import { Locations,  } from './tables/locations.js';

const app = express();
const PORT = 8080;

app.post('AddCity', AddCity);


app.post('AddRisk', AddRisk);


app.use(express.json())




app.listen(PORT,() => console.log(`test api on http://localhost:${PORT}`))