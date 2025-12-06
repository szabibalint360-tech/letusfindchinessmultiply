import { sequelize } from "../db-instance.js";
import { Locations } from "./locations.js";
import { Risks } from "./risks.js";

// Associations here ONLY
Risks.belongsTo(Locations, { foreignKey: "satRel" });
Locations.hasMany(Risks, { foreignKey: "satRel" });

// Sync DB here, never in model files
await sequelize.sync().catch(console.error);

export { sequelize, Locations, Risks };