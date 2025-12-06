import { DataTypes } from "sequelize";
import { Locations } from "./locations.js";
import { sequelize } from "../db-instance.js";
import { POSSIBLE_RISKS } from "../vld/risk-validation.js";


export var Risks = sequelize.define('Risks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type_risk: {
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
