import express from "express";
import { Locations, sequelize, Risks } from "./tables/index.js";
import { POSSIBLE_RISKS } from "./vld/risk-validation.js";
import { JUDETE } from "./vld/judet-validation.js";

const createLocation = async (req, res) => {
    try {
        let arrLOC = [];
        for (let obj of req.body) {
            const loc = await Locations.create({
                judeti: obj.judeti,
                locatie: obj.locatie,
                numLoc: obj.numLoc
            });
            arrLOC.push(loc);
        }

        return res.status(201).json({
            status: true,
            content: arrLOC,
            contentString: JSON.stringify(arrLOC)
        });
    } catch (error) {
        console.error("Error creating location:", error);
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ status: false, content: error.errors });
        }
        return res.status(500).json({ status: false, content: error.message });
    }
};

export const judetGetList = async (req, res) => {
    res.status(200).json({ status: true, content: JUDETE });
}

const getAllLocations = async (req, res) => {
    try {
        const list = await Locations.findAll();
        return res.status(200).json({ status: true, content: list, contentString: JSON.stringify(list) });
    } catch (error) {
        console.error("Error fetching all locations:", error);
        return res.status(500).json({ status: false, content: error.message });
    }
};

const getLocationsByJudet = async (req, res) => {
    try {
        const list = await Locations.findAll({ where: { judeti: req.params.judeti } });
        return res.status(200).json({ status: true, content: list, contentString: JSON.stringify(list) });
    } catch (error) {
        console.error("Error fetching locations by judet:", error);
        return res.status(500).json({ status: false, content: error.message });
    }
};

const deleteLocation = async (req, res) => {
    try {
        const deletedRows = await Locations.destroy({ where: { id: req.params.id } });

        if (deletedRows > 0) {
            return res.status(200).json({ status: true, content: { deleted: true, id: req.params.id } });
        } else {
            return res.status(404).json({ status: false, content: `Location with ID ${req.params.id} not found.` });
        }
    } catch (error) {
        console.error("Error deleting location:", error);
        return res.status(500).json({ status: false, content: error.message });
    }
};

// --- RISKS CRUD ---

const createRisk = async (req, res) => {
    try {
        const newRisk = await Risks.create({
            info: req.body.info,
            satRel: req.body.satRel,
            typerisk: req.body.typerisk,
            arrayStringNumeFisiere: req.body.arrayStringNumeFisiere // Ensure frontend sends this as a JSON string or array
        });
        return res.status(201).json({ status: true, content: newRisk, contentString: JSON.stringify(newRisk) });
    } catch (error) {
        console.error("Error creating risk:", error);
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ status: false, content: error.errors });
        }
        return res.status(500).json({ status: false, content: error.message });
    }
};

export const riskValidationTest = async (req, res) => {
   res.status(200).json({ status: true, content: POSSIBLE_RISKS });
}



// DEBUG METHOD FOR BULK INSERT
const riskBULK = async (req, res) => {
    try {
        await Risks.bulkCreate(req.body.jsonArray);
        return res.status(200).json({ status: true, content: 'Table populated successfully.' });
    } catch (error) {
        console.error("Error during Risks bulkCreate:", error);
        return res.status(500).json({ status: false, content: error.message });
    }
};

// LIST ALL RISKS
const getAllRisks = async (req, res) => {
    try {
        const list = await Risks.findAll();
        return res.status(200).json({ status: true, content: list, contentString: JSON.stringify(list) });
    } catch (error) {
        console.error("Error fetching all risks:", error);
        return res.status(500).json({ status: false, content: error.message });
    }
};

// GET RISK BY ID
const getRiskById = async (req, res) => {
    try {
        const risk = await Risks.findByPk(req.params.id);

        if (risk) {
            return res.status(200).json({ status: true, content: risk, contentString: JSON.stringify(risk) });
        } else {
            return res.status(404).json({ status: false, content: `Risk with ID ${req.params.id} not found.` });
        }
    } catch (error) {
        console.error("Error fetching risk by ID:", error);
        return res.status(500).json({ status: false, content: error.message });
    }
};

// FILTER BY SATREL
const getRisksBySatRel = async (req, res) => {
    try {
        const list = await Risks.findAll({ where: { satRel: req.params.satRel } });
        return res.status(200).json({ status: true, content: list, contentString: JSON.stringify(list) });
    } catch (error) {
        console.error("Error fetching risks by satRel:", error);
        return res.status(500).json({ status: false, content: error.message });
    }
};

const updateRisk = async (req, res) => {
    try {
        const [updatedRows] = await Risks.update(req.body, { where: { id: req.params.id } });

        if (updatedRows > 0) {
            const updatedRisk = await Risks.findByPk(req.params.id);
            return res.status(200).json({ status: true, content: updatedRisk, contentString: JSON.stringify(updatedRisk) });
        } else {
            return res.status(404).json({ status: false, content: `Risk with ID ${req.params.id} not found or no changes made.` });
        }
    } catch (error) {
        console.error("Error updating risk:", error);
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ status: false, content: error.errors });
        }
        return res.status(500).json({ status: false, content: error.message });
    }
};

const deleteRisk = async (req, res) => {
    try {
        const deletedRows = await Risks.destroy({ where: { id: req.params.id } });

        if (deletedRows > 0) {
            return res.status(200).json({ status: true, content: { deleted: true, id: req.params.id } });
        } else {
            return res.status(404).json({ status: false, content: `Risk with ID ${req.params.id} not found.` });
        }
    } catch (error) {
        console.error("Error deleting risk:", error);
        return res.status(500).json({ status: false, content: error.message });
    }
};

export {
    riskBULK,
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