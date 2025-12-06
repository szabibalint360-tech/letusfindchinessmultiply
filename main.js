import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { 
    createLocation,
    getAllLocations,
    getLocationsByJudet,
    deleteLocation,
    createRisk,
    getAllRisks,
    getRiskById,
    getRisksBySatRel,
    updateRisk,
    deleteRisk,
    riskBULK
} from './methods.api.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve debug pages
app.use(express.static(path.join(__dirname, 'debugPages')));

const PORT = 8080;

// --- API ROUTES ---

// RISKS
app.post("/risks", createRisk);
app.get("/risks", getAllRisks);
app.get("/risks/:id", getRiskById);
app.get("/risks/satrel/:satRel", getRisksBySatRel);
app.put("/risks/:id", updateRisk);
app.delete("/risks/:id", deleteRisk);
app.get('/risks/bulkcreate', riskBULK);

// LOCATIONS
app.post("/locations", createLocation);
app.get("/locations", getAllLocations);
app.get("/locations/judet/:judeti", getLocationsByJudet);
app.delete("/locations/:id", deleteLocation);

// Debug page routes (serve HTML files)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'debugPages', 'index.html')));
app.get('/locations-debug', (req, res) => res.sendFile(path.join(__dirname, 'debugPages', 'locations-debug.html')));
app.get('/risks-debug', (req, res) => res.sendFile(path.join(__dirname, 'debugPages', 'risks-debug.html')));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
