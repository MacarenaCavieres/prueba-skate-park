import { pool } from "../database/connection.db.js";

const getAll = async () => {
    const { rows } = await pool.query("select * from skaters");
    return rows;
};

const findOne = async (email) => {
    const query = {
        text: "select * from skaters where email = $1",
        values: [email],
    };
    const { rows } = await pool.query(query);
    return rows[0];
};

export const Skaters = {
    getAll,
    findOne,
};
