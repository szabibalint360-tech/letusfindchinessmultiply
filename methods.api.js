import express from "express";
import { Locations } from "./tables/locations.js";
import { Risks } from "./tables/risks.js";


const createLocation = async (req, res) => {
    try {
        const loc = await Locations.create({
            judeti: req.body.judeti,
            locatie: req.body.locatie,
            numLoc: req.body.numLoc
        });
        res.status(201).json(loc); // Use 201 Created status for POST
    } catch (error) {
        console.error("Error creating location:", error);
        // Sequelize validation errors often benefit from 400 Bad Request
        res.status(500).json({ error: "Failed to create location", details: error.message });
    }
};

const getAllLocations = async (req, res) => {
    try {
        const list = await Locations.findAll();
        res.json(list);
    } catch (error) {
        console.error("Error fetching all locations:", error);
        res.status(500).json({ error: "Failed to retrieve locations" });
    }
};

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

// --- RISKS CRUD ---

const createRisk = async (req, res) => {
    try {
        const newRisk = await Risks.create({
            info: req.body.info,
            satRel: req.body.satRel,
            arrayStringNumeFisiere: req.body.arrayStringNumeFisiere // Ensure frontend sends this as a JSON string or array
        });
        res.status(201).json(newRisk); // Use 201 Created status
    } catch (error) {
        console.error("Error creating risk:", error);
        res.status(500).json({ error: "Failed to create risk", details: error.message });
    }
};

const getAllRisks = async (req, res) => {
    try {
        const list = await Risks.findAll();
        res.json(list);
    } catch (error) {
        console.error("Error fetching all risks:", error);
        res.status(500).json({ error: "Failed to retrieve risks" });
    }
};

const getRiskById = async (req, res) => {
    try {
        const risk = await Risks.findByPk(req.params.id);
        
        if (risk) {
            res.json(risk);
        } else {
            res.status(404).json({ message: `Risk with ID ${req.params.id} not found.` });
        }
    } catch (error) {
        console.error("Error fetching risk by ID:", error);
        res.status(500).json({ error: "Failed to retrieve risk by ID" });
    }
};

const getRisksBySatRel = async (req, res) => {
    try {
        const list = await Risks.findAll({
            where: { satRel: req.params.satRel }
        });
        res.json(list);
    } catch (error) {
        console.error("Error fetching risks by satRel:", error);
        res.status(500).json({ error: "Failed to retrieve risks by satRel" });
    }
};

const updateRisk = async (req, res) => {
    try {
        // Update function already uses req.body directly, which is fine for updates.
        const [updatedRows] = await Risks.update(req.body, {
            where: { id: req.params.id }
        });

        if (updatedRows > 0) {
            const updatedRisk = await Risks.findByPk(req.params.id);
            res.json(updatedRisk);
        } else {
            res.status(404).json({ updated: false, message: `Risk with ID ${req.params.id} not found or no changes made.` });
        }
    } catch (error) {
        console.error("Error updating risk:", error);
        res.status(500).json({ error: "Failed to update risk" });
    }
};

const deleteRisk = async (req, res) => {
    try {
        const deletedRows = await Risks.destroy({ 
            where: { id: req.params.id }
        });
        
        if (deletedRows > 0) {
            res.json({ deleted: true, message: `Risk with ID ${req.params.id} deleted successfully.` });
        } else {
            res.status(404).json({ deleted: false, message: `Risk with ID ${req.params.id} not found.` });
        }
    } catch (error) {
        console.error("Error deleting risk:", error);
        res.status(500).json({ error: "Failed to delete risk" });
    }
};

export { 
    createLocation, 
    getAllLocations, 
    getLocationsByJudet, 
    deleteLocation,
    createRisk,
    getAllRisks,
    getRiskById,
    getRisksBySatRel,
    updateRisk,
    deleteRisk
};