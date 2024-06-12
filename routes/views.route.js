import { Router } from "express";
import { skatersController } from "../controllers/skaters.controller.js";
import { validateToken } from "../middlewares/token.middleware.js";

const router = Router();

router.get("/", skatersController.getAllSkaters);

router.get("/registro", skatersController.getRegistro);
router.post("/user", skatersController.postOneSkater);

router.get("/login", skatersController.getLogin);
router.post("/auth", skatersController.postLogin);

router.get("/datos", validateToken, skatersController.getDatos);
router.delete("/eliminar", skatersController.deleteOneSkater);
router.put("/actualizar", skatersController.putOneSkater);

router.get("/admin", (req, res) => {
    res.render("admin");
});

export default router;
