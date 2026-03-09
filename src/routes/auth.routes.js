import { Router } from "express"
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import admController from "../controllers/adm.controller.js";
import agendamentoController from "../controllers/agendamento.controller.js";
import globalController from "../controllers/global.controller.js";
import clienteController from "../controllers/cliente.controller.js";
import diasOffController from "../controllers/diasOff.controller.js";
import servicosController from "../controllers/servicos.controller.js";

const router = Router();

//ROTAS AUTH -------------------------------------------------------------------------------------------------------------------------
router.post('/cadastrarcliente', authController.cadastroCliente); // CADASTRAR USUARIO
router.post('/login', authController.login); // FAZER LOGIN
router.post('/refreshtoken', authController.refreshToken) // VALIDAR REFRESH TOKEN E ENVIAR NOVO TOKEN
router.get('/consultarverificado/:uuid', authController.consultarVerificado); // VER SE JA ESTA VERIFICADO
router.post('/verificar', authController.verificar); //VERIFICAR USUARIO


//ROTAS ADM -------------------------------------------------------------------------------------------------------------------------
router.post('/adicionadiaoff', authMiddleware.verifyToken, authMiddleware.verifyAdm, diasOffController.adicionaDiaOff);
router.patch('/atualizarvalorservico', authMiddleware.verifyToken, authMiddleware.verifyAdm, servicosController.atualizarValorServico);
router.post('/cadastrarprofissional', authMiddleware.verifyToken, authMiddleware.verifyAdm, authController.cadastroProfissional);
router.get('/buscaragendamentosadm', authMiddleware.verifyToken, authMiddleware.verifyAdm, globalController.buscarAgendamentos);
// router.post('/buscarprofissionalid');
// router.post('/desativarusuarioid');
// router.post('/buscarclientes');


//ROTAS PROFISSIONAL -------------------------------------------------------------------------------------------------------------------------
// router.post('/atualizastatusagendamento');
// router.post('/buscaragendamentoprofissional');


//ROTAS PROFISSIONAL E ADM -------------------------------------------------------------------------------------------------------------------------
// router.post('/atualizastatusagendamento');
// router.post('/bloquearhorario');


//ROTAS GLOBAL -------------------------------------------------------------------------------------------------------------------------
router.post('/buscaragendamentoid', authMiddleware.verifyToken, globalController.buscarAgendamentoId);
router.get('/buscarservicos', authMiddleware.verifyToken, globalController.buscarServicos);
router.get('/buscarprofissionais', authMiddleware.verifyToken, globalController.buscarProfissionais);
router.get('/buscarclientes', authMiddleware.verifyToken, globalController.buscarClientes);

//ROTAS AGENDAMENTO -------------------------------------------------------------------------------------------------------------------------
router.post('/verificadiaoff', authMiddleware.verifyToken, agendamentoController.verificaDiaOff);
router.post('/buscaprofissionaisdisponiveis', authMiddleware.verifyToken, agendamentoController.buscaProfissionaisDisponiveis);
router.post('/buscahorariosreservados', authMiddleware.verifyToken, agendamentoController.buscaHorariosReservados);
router.post('/agendar', authMiddleware.verifyToken, agendamentoController.agendar);
    

//ROTAS CLIENTE -------------------------------------------------------------------------------------------------------------------------
router.post('/enviarfeedback', authMiddleware.verifyToken, clienteController.enviarFeedback);
router.post('/buscaragendamentoscliente', authMiddleware.verifyToken, clienteController.buscarAgendamentosCliente);
router.post('/buscaragendamentosclientefiltro', authMiddleware.verifyToken, clienteController.buscarAgendamentosClienteFiltro);
router.post('/cancelaragendamentocliente', authMiddleware.verifyToken, clienteController.cancelarAgendamentoCliente)


export default router;