import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/locations.sqlite'

});

export const Locations = sequelize.define('Locations', {
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

sequelize.sync()
    .then( () => {console.log("DB connection working!");})
    .catch(error => console.log("DB connection failed", error));