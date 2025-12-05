import express from "express";
import { Locations } from "./tables/locations.js";

// --- Controller Functions ---

/**
 * Handles POST request to create a new location.
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const createLocation = async (req, res) => {
    try {
        // req.body should contain { judeti, locatie, numLoc }
        const loc = await Locations.create(req.body);
        res.json(loc);
    } catch (error) {
        console.error("Error creating location:", error);
        res.status(500).json({ error: "Failed to create location" });
    }
};

/**
 * Handles GET request to retrieve all locations.
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getAllLocations = async (req, res) => {
    try {
        const list = await Locations.findAll();
        res.json(list);
    } catch (error) {
        console.error("Error fetching all locations:", error);
        res.status(500).json({ error: "Failed to retrieve locations" });
    }
};

/**
 * Handles GET request to retrieve locations by county (judet).
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const getLocationsByJudet = async (req, res) => {
    try {
        const list = await Locations.findAll({
            where: { judeti: req.params.judeti }
        });
        res.json(list);
    } catch (error) {
        console.error("Error fetching locations by judet:", error);
        res.status(500).json({ error: "Failed to retrieve locations by judet" });
    }
};

/**
 * Handles DELETE request to delete a location by ID.
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
const deleteLocation = async (req, res) => {
    try {
        const deletedRows = await Locations.destroy({ 
            where: { id: req.params.id }
        });
        
        if (deletedRows > 0) {
            res.json({ deleted: true, message: `Location with ID ${req.params.id} deleted successfully.` });
        } else {
            res.status(404).json({ deleted: false, message: `Location with ID ${req.params.id} not found.` });
        }
    } catch (error) {
        console.error("Error deleting location:", error);
        res.status(500).json({ error: "Failed to delete location" });
    }
};

//should go to main yes i wrote this 
const app = express();
app.use(express.json());

// CREATE
app.post("/locations", createLocation);

// READ all
app.get("/locations", getAllLocations);

// READ by county
app.get("/locations/judet/:judeti", getLocationsByJudet);

// DELETE
app.delete("/locations/:id", deleteLocation);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

export { 
    createLocation, 
    getAllLocations, 
    getLocationsByJudet, 
    deleteLocation 
};