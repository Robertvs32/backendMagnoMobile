import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const authMiddleware = {

    verifyToken: (req, res, next) => {
        try{
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if(!token){
                throw new Error("Token nao foi enviado!");
            }
        
            const secret = process.env.JWT_SECRET;
            const decodificado = jwt.verify(token, secret);

            req.userId = decodificado.id
            req.email =  decodificado.email
            req.nome = decodificado.nome
            req.roles = decodificado.roles
            console.log(token);
            next();
        }catch(error){
            return res.status(401).json({mensagem: "Token invalido!"});
        }
    }

}

export default authMiddleware