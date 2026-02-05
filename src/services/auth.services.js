import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import authModels from '../models/auth.models.js';
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto';

dotenv.config({path: '../../.env'});

const authServices = {

    cadastrar: async (objetoDados) => {
        let dados = objetoDados;

        const hashSenha = await authServices.gerarHashSenha(objetoDados.senha);

        const uuid = crypto.randomUUID();

        dados = {...objetoDados, senha: hashSenha, uuid: uuid}

        await authModels.cadastrar(dados)

        return { 
            uuid: dados.uuid, 
            nome: dados.nome,
            celular: dados.celular
        }
    },

    gerarHashSenha: async (senha) => {
        const salt = 10;
        const hashSenha = await bcrypt.hash(senha, salt);
        return hashSenha;
    },

    validarLogin: async (email, senha) => {
        const user = await authModels.buscaUserEmail(email);

        if(!user){
            throw new Error("Usuario nao encontrado!");
        }

        if(user.verificado == 0){
            throw new Error("Usuario nao verificado!");
        }

        const comparacaoHash = await bcrypt.compare(senha, user.senha);
        
        if(!comparacaoHash){
            throw new Error("Senha incorreta");
        }

        const payloadToken = {
            roles: user.roles,
            id: user.id
        }

        const secretToken = process.env.JWT_SECRET;
        const secretRefreshToken = process.env.JWT_SECRET_REFRESH;

        const token = jwt.sign(payloadToken, secretToken, { expiresIn: '15m'});
        const refreshToken = jwt.sign(payloadToken, secretRefreshToken, { expiresIn: '7d'});

        await authModels.guardarRefreshToken(user.id, refreshToken);

        return{
            usuario: {
                id: user.id,
                nome: user.nome,
                roles: user.roles   
            },
            token,
            refreshToken
        }
    },

    validarRefreshToken: async (refreshToken) => {
        if(!refreshToken){
            throw new Error("RefreshToken nao existe!");
        }
        const refreshTokenVerify = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH); //verifica se e veridico

        const id = refreshTokenVerify.id; //pega o id do refresh token

        const user = await authModels.buscarUserId(id); //busca os dados do usuario do mysql

        //verifica se os refresh sao iguais e se o usuario tem refresh token guardado no db
        if(!user.refresh_token || user.refresh_token !== refreshToken){ 
            throw new Error("Refresh Token invalido!");
        }

        //payload pra enviar pro token
        const payloadToken = {
            roles: user.roles,
            id: user.id
        }

        //cria token
        const novoToken = jwt.sign(payloadToken, process.env.JWT_SECRET, { expiresIn: '15m' });

        return novoToken;
    }

}

export default authServices;