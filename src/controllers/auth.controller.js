import authServices from '../services/auth.services.js';
import { enviarLinkConfirmacao } from '../services/whatsapp.services.js';

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

    testetoken: async (req, res) => {
        try{
            const flag = req.body.flag;

            return flag == 1 
                ? 
            res.status(200).json({mensagem: 'Valido, deu certo o token'}) 
                : 
            res.status(500).json({mensagem: "Erro no envio"});
                    
        }catch(error){
            res.status(200).json({
                mensagem: error.message ?? "Erro no envio do token"
            })
        }
    }

}


export default authController;
