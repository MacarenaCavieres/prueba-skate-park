import path from "path";
import bcryptjs from "bcryptjs";
import { Skaters } from "../models/skater.model.js";
import { generateToken } from "../utils/file.config.js";

const __dirname = import.meta.dirname;
const pathFile = path.join(__dirname, "../public/assets/imgs");

const getAllSkaters = async (req, res) => {
    try {
        const data = await Skaters.getAll();

        return res.render("home", { data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

const getRegistro = (req, res) => {
    return res.render("registro");
};

const postOneSkater = async (req, res) => {
    const { file } = req.files;
    const { email, nombre, password, repeat_password, anos_experiencia, especialidad } = req.body;

    if (password !== repeat_password)
        return res.status(400).json({ ok: false, msg: "Contraseñas no coinciden" });

    const name = `${nombre.split(" ").join("")}.jpg`;
    const urlFoto = `./assets/imgs/${name}`;

    file.mv(path.join(pathFile, name), (err) => {
        if (err) {
            return res.status(500).json({ ok: false, msg: "Error de servidor" });
        }
    });

    try {
        const skater = await Skaters.findOne(email);

        if (skater) return res.status(409).json({ ok: false, msg: "Email ya registrado" });

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const newSkater = {
            email,
            nombre,
            password: hashPassword,
            anos_experiencia,
            especialidad,
            foto: urlFoto,
        };

        const data = await Skaters.postOne(newSkater);

        const token = generateToken(data.email);

        return res.status(201).json({ ok: true, msg: "Usuario creado con éxito", Participante: data, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

export const skatersController = {
    getAllSkaters,
    getRegistro,
    postOneSkater,
};
