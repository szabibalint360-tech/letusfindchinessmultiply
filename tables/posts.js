import {DataTypes } from "sequelize";
import { sequelize } from "../db-instance.js";

export var Posts = sequelize.define('Posts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mainText: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    // This field stores an array of file names (images)
    files: { 
        type: DataTypes.JSON, 
        allowNull: true, 
        defaultValue: []
    }
}, {
    tableName: 'posts', 
    timestamps: true 
});