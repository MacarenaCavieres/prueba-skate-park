import path from "path";
import bcryptjs from "bcryptjs";
import { Skaters } from "../models/skater.model.js";
import { generateToken } from "../utils/file.config.js";

import jwt from "jsonwebtoken";
import "dotenv/config";
const secretKey = process.env.SK;

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

    if (!email || !nombre || !password || !repeat_password || !anos_experiencia || !especialidad)
        return res.status(400).json({ ok: false, msg: "Todos los campos obligatorios" });

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

        return res
            .status(201)
            .header("authorization", token)
            .json({
                ok: true,
                msg: "Usuario creado con éxito",
                participante: data,
                token,
                href: `http://localhost:3000/datos?token=${token}`,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

const getLogin = (req, res) => {
    return res.render("login");
};

const postLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) res.status(400).json({ ok: false, msg: "Todos los campos obligatorios" });

    try {
        const skater = await Skaters.findOne(email);

        if (!skater) return res.status(409).json({ ok: false, msg: "Usuario no encontrado" });

        const match = await bcryptjs.compare(password, skater.password);

        if (!match) return res.status(400).json({ ok: false, msg: "Usuario o contraseña incorrecta" });

        const token = generateToken(skater.email);

        return res.header("authorization", token).json({
            ok: true,
            msg: "Usuario logeado con éxito",
            token,
            href: `http://localhost:3000/datos?token=${token}`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

const getDatos = async (req, res) => {
    try {
        const skater = await Skaters.findOne(req.email);

        return res.render("datos", { skater });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

const deleteOneSkater = async (req, res) => {
    const { email, password, repeat_password } = req.body;

    if (!email || !password || !repeat_password)
        return res.status(400).json({ ok: false, msg: "Falta algun campo" });

    if (password !== repeat_password)
        return res.status(400).json({ ok: false, msg: "Contraseñas no coinciden" });

    try {
        const skater = await Skaters.findOne(email);

        if (!skater) return res.status(409).json({ ok: false, msg: "Usuario no encontrado" });

        const match = await bcryptjs.compare(password, skater.password);

        if (!match) return res.status(400).json({ ok: false, msg: "Usuario o contraseña incorrecta" });

        await Skaters.deleteOne(email);

        return res.json({ ok: true, msg: "Registro eliminado con éxito" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

const putOneSkater = async (req, res) => {
    const { email, nombre, password, repeat_password, anos_experiencia, especialidad } = req.body;

    if (!email || !nombre || !password || !repeat_password || !anos_experiencia || !especialidad)
        return res.status(400).json({ ok: false, msg: "Todos los campos obligatorios" });

    if (password !== repeat_password)
        return res.status(400).json({ ok: false, msg: "Contraseñas no coinciden" });

    try {
        const skater = await Skaters.findOne(email);

        if (!skater) return res.status(409).json({ ok: false, msg: "Usuario no encontrado" });

        const dataAc = await Skaters.putOne(nombre, password, anos_experiencia, especialidad, email);

        return res.json({ ok: true, msg: "Cuenta actualizada con éxito", participante: dataAc });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

export const skatersController = {
    getAllSkaters,
    getRegistro,
    postOneSkater,
    getLogin,
    postLogin,
    getDatos,
    deleteOneSkater,
    putOneSkater,
};
