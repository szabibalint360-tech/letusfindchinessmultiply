import { Sequelize } from "sequelize";

//include something something from tables.

async function AddCity(req, res) {
    //towns.Add(req.body);
    res.status(200).send('City added successfully');
}

export { AddCity };