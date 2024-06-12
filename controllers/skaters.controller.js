import { Skaters } from "../models/skater.model.js";

const getAllSkaters = async (req, res) => {
    try {
        const data = await Skaters.getAll();

        return res.render("home", { data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

export const skatersController = {
    getAllSkaters,
};
