import { Router } from "express";
import { skatersController } from "../controllers/skaters.controller.js";

const router = Router();

router.get("/", skatersController.getAllSkaters);

router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/registro", (req, res) => {
    res.render("registro");
});
router.get("/datos", (req, res) => {
    res.render("datos");
});
router.get("/admin", (req, res) => {
    res.render("admin");
});

export default router;
