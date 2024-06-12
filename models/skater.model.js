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

const postOne = async ({ email, nombre, password, anos_experiencia, especialidad, foto }) => {
    const query = {
        text: "insert into skaters (email,nombre,password,anos_experiencia,especialidad,foto) values ($1,$2,$3,$4,$5,$6) returning email,nombre,anos_experiencia,especialidad,foto,estado",
        values: [email, nombre, password, anos_experiencia, especialidad, foto],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

const deleteOne = async (email) => {
    const query = {
        text: "delete from skaters where email = $1 returning *",
        values: [email],
    };

    const { rows } = await pool.query(query);

    return rows[0];
};

const putOne = async (nombre, password, anos_experiencia, especialidad, email) => {
    const query = {
        text: "update skaters set nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4 where email = $5 returning email,nombre,anos_experiencia,especialidad",
        values: [nombre, password, anos_experiencia, especialidad, email],
    };

    const { rows } = await pool.query(query);

    return rows[0];
};

export const Skaters = {
    getAll,
    findOne,
    postOne,
    deleteOne,
    putOne,
};
