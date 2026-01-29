import { Router } from "express"
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/cadastrar', authController.cadastro);
router.post('/login', authController.login);
router.post('/refreshtoken', authController.refreshToken)
router.post('/testetoken', authMiddleware.verifyToken, authController.testetoken);

export default router;