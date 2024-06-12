import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("home");
});
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
