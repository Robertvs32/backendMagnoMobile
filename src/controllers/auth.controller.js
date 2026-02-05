import authServices from '../services/auth.services.js';
import { enviarLinkConfirmacao } from '../services/whatsapp.services.js';
import authModels from '../models/auth.models.js';

const authController = {

    cadastro: async (req, res) => {
        try{
            const objetoDados = req.body;
            const {nome, uuid, celular} = await authServices.cadastrar(objetoDados);

            enviarLinkConfirmacao(nome, uuid, celular);

            res.status(201).json({
                mensagem: "Usuario criado com sucesso!"
            });
        }catch(error){
            res.status(400).json({
                mensagem: error.message ?? "Erro ao cadastrar usuario!"
            });
        }
    },

    login: async (req, res) => {
        try{
            const { email, senha } = req.body;
            const resultLogin = await authServices.validarLogin(email, senha);

            res.status(200).json(resultLogin)
        }catch(error){
            res.status(500).json({
                mensagem: error.message,
            })
        }
    },

    refreshToken: async (req, res) => {
        try{
            const newToken = await authServices.validarRefreshToken(req.body.refreshToken);
            res.status(200).json({
                token: newToken
            })
        }catch(error){
            res.status(401).json({
                mensagem: "Login expirou! Faca login novamente!"
            })
        }
    },

    verificarVerificado: async (req, res) => {
        try{
            const uuid = req.params.uuid;
            const verificado = await authModels.buscaVerificado(uuid);

            res.status(200).json({verificado}); 
        }catch(error){
            res.status(500).json({mensagem: error.message})
        }
    },

    verificar: async (req, res) => {
        try{
            const uuid = req.body.uuid;
            await authModels.verificarUsuario(uuid);
            res.status(200).json({mensagem: "Usuário verificado!"});
        }catch(error){
            res.status(500).json({mensagem: error.message});
        }
    
    }

}


export default authController;
