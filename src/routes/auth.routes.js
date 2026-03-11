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
router.post('/cadastrarcliente', authController.cadastroCliente);
router.post('/login', authController.login);
router.get('/refreshtoken', authController.refreshToken)
router.get('/verificarverificado/:uuid', authController.consultarVerificado);
router.post('/verificar', authController.verificar);
router.post('/desativarusuario', authMiddleware.verifyToken, authMiddleware.verifyAdm, admController.desativarUsuario);

//ROTAS ADM ------------------------------------------------------------------------------------------------------------------------
router.post('/cadastrarprofissional', authMiddleware.verifyToken, authMiddleware.verifyAdm, authController.cadastroProfissional);
router.post('/buscaragendamentosadm', authMiddleware.verifyToken, authMiddleware.verifyAdm, admController.buscarAgendamentosAdm);
router.get('/buscauserid/:id', authMiddleware.verifyToken, authMiddleware.verifyAdm, admController.buscaUserId);
router.post('/concluiagendamentoadm', authMiddleware.verifyToken, authMiddleware.verifyAdm, globalController.concluiAgendamentoAdm);
// router.post('./cancelaagendamentoadm', authMiddleware.verifyToken, authMiddleware.verifyAdm,)

//ROTAS DIAS OFF
router.get('/verificadiaoff/:dia', authMiddleware.verifyToken, diasOffController.verificaDiaOff);
router.post('/adicionadiaoff', authMiddleware.verifyToken, authMiddleware.verifyAdm, diasOffController.adicionaDiaOff);
router.post('/retiradiaoff', authMiddleware.verifyToken, authMiddleware.verifyAdm, diasOffController.retiraDiaOff);
router.get('/buscadiasoff', authMiddleware.verifyToken, authMiddleware.verifyAdm, diasOffController.buscaDiasOff);

//ROTAS SERVICO
router.post('/cadastrarservico', authMiddleware.verifyToken, authMiddleware.verifyAdm, servicosController.cadastrarServico)
router.post('/desativarservico', authMiddleware.verifyToken, authMiddleware.verifyAdm, servicosController.desativarServico)
router.patch('/atualizarvalorservico', authMiddleware.verifyToken, authMiddleware.verifyAdm, servicosController.atualizarValorServico);


//ROTAS GLOBAL -------------------------------------------------------------------------------------------------------------------------
router.get('/buscaragendamentoid/:id', authMiddleware.verifyToken, globalController.buscarAgendamentoId); 
router.get('/buscarservicos', authMiddleware.verifyToken, globalController.buscarServicos);
router.get('/buscarprofissionais', authMiddleware.verifyToken, globalController.buscarProfissionais);
router.get('/buscarclientes', authMiddleware.verifyToken, globalController.buscarClientes);


//BARBEIRO
router.post('/concluiagendamentobarbeiro', authMiddleware.verifyToken, authMiddleware.verifyBarbeiro, globalController.concluiAgendamentoBarbeiro);
// router.post('./cancelaagendamentobarbeiro', authMiddleware.verifyToken, authMiddleware.verifyBarbeiro,)




//ROTAS AGENDAMENTO -------------------------------------------------------------------------------------------------------------------------
router.get('/buscaprofissionaisdisponiveis/:dia_semana', authMiddleware.verifyToken, agendamentoController.buscaProfissionaisDisponiveis);
router.get('/buscahorariosreservados/:dia/:id_profissional', authMiddleware.verifyToken, agendamentoController.buscaHorariosReservados);
router.post('/agendar', authMiddleware.verifyToken, agendamentoController.agendar);
    

//ROTAS CLIENTE -------------------------------------------------------------------------------------------------------------------------
router.post('/enviarfeedback', authMiddleware.verifyToken, clienteController.enviarFeedback);
router.post('/cancelaragendamentocliente', authMiddleware.verifyToken, clienteController.cancelarAgendamentoCliente)
router.post('/buscaragendamentoscliente', authMiddleware.verifyToken, clienteController.buscarAgendamentosCliente)


export default router;