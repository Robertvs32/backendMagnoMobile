import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'
import router from './routes/auth.routes.js';
import { iniciarWhatsapp } from './services/whatsapp.services.js';

dotenv.config({path: '../.env'});

const app = express();

iniciarWhatsapp();

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning']
}));

app.use(router);

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
})