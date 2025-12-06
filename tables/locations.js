import { DataTypes } from "sequelize";
import { sequelize } from "../db-instance.js";



export var Locations = sequelize.define('Locations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judeti: {
        type: DataTypes.STRING 
    },
    locatie: {
        type: DataTypes.STRING 
    },
    numLoc: { 
        type: DataTypes.INTEGER 
    }
}, {
    tableName: 'locations',
    timestamps: false 
});