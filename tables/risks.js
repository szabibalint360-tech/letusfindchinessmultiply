import { DataTypes, Sequelize } from "sequelize";
import { Locations } from "./locations";
require('dotenv').config();

import { POSSIBLE_RISKS } from "../vld/risk-validation.js";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/analytics.sqlite'

});

export var Risks = sequelize.define('Risks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    typeofRisk: {
        type: DataTypes.STRING,
        validate: {
            isIn: [POSSIBLE_RISKS]
        }
    },
    info: {
        type: DataTypes.STRING(2048)
    },
    satRel: {
        type: DataTypes.INTEGER,
        references: {
            model: Locations,
            key: 'id'
        }
    },
    arrayStringNumeFisiere: {
        type: DataTypes.JSON
    }
}, {
    tableName: 'risks',
    timestamps: true
});

Risks.belongsTo(Locations, { foreignKey: 'satRel' });

sequelize.sync()
    .then(() => { console.log("DB connection working!"); })
    .catch(error => console.log("DB connection failed", error));