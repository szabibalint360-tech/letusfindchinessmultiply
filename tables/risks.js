import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/risks.sqlite'

});

export const Risks = sequelize.define('Risks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    info: {
        type: DataTypes.STRING(2048)
    },
    satRel: {
        type: DataTypes.INTEGER
    },
    arrayStringNumeFisiere: {
        type: DataTypes.JSON
    }
}, {
    tableName: 'risks',
    timestamps: true
});

sequelize.sync()
    .then(() => { console.log("DB connection working!"); })
    .catch(error => console.log("DB connection failed", error));