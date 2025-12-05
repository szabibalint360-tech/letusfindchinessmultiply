import { DataTypes, Sequelize } from "sequelize";
import { Risks } from "./risks";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/analytics.sqlite'

});

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

Locations.hasMany(Risks, { foreignKey: 'satRel' });

sequelize.sync()
    .then( () => {console.log("DB connection working!");})
    .catch(error => console.log("DB connection failed", error));