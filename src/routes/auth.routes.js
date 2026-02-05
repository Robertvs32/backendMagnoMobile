import { Router } from "express"
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/cadastrar', authController.cadastro);
router.post('/login', authController.login);
router.post('/refreshtoken', authController.refreshToken)
router.get('/verificarverificado/:uuid', authController.verificarVerificado);
router.post('/verificar', authController.verificar);

export default router;