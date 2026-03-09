import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import authModels from '../models/auth.models.js';
import jwt from 'jsonwebtoken'
import globalModels from '../models/global.models.js';
import crypto from 'node:crypto';

dotenv.config({path: '../../.env'});

const authServices = {

    cadastrarCliente: async (objetoDados) => {
        let dados = objetoDados;

        const hashSenha = await authServices.gerarHashSenha(objetoDados.senha);

        const uuid = crypto.randomUUID();

        dados = {...objetoDados, senha: hashSenha, uuid: uuid}

        await authModels.cadastrarCliente(dados)

        return { 
            uuid: dados.uuid, 
            nome: dados.nome,
            celular: dados.celular
        }
    },

    cadastrarProfissional: async (objetoDados) => {
        let dados = objetoDados;

        const hashSenha = await authServices.gerarHashSenha(objetoDados.senha);

        const uuid = crypto.randomUUID();

        dados = {...objetoDados, senha: hashSenha, uuid: uuid}

        const id = await authModels.cadastrarProfissional(dados)

        await authModels.addFolgaProfissional(id);

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
        //FUNCAO TESTA EMAIL REGEX
        const user = await globalModels.buscaUserEmail(email);

        if(!user){
            throw new Error("Verifique email ou senha");
        }

        if(user.verificado == 0){
            throw new Error("Usuario nao verificado!");
        }

        const comparacaoHash = await bcrypt.compare(senha, user.hash_senha);
        
        if(!comparacaoHash){
            throw new Error("Verifique email ou senha");
        }

        const payloadToken = {
            id: user.id,
            nome: user.nome,
            roles: user.roles
        }

        const token = jwt.sign(payloadToken, process.env.JWT_SECRET, { expiresIn: '15m'});
        const refreshToken = jwt.sign(payloadToken, process.env.JWT_SECRET_REFRESH, { expiresIn: '1d'});

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

        const payloadToken = {
            id: refreshTokenVerify.id,
            nome: refreshTokenVerify.nome,
            roles: refreshTokenVerify.roles
        }

        const novoToken = jwt.sign(payloadToken, process.env.JWT_SECRET, { expiresIn: '15m' });

        return novoToken;
    }

}

export default authServices;