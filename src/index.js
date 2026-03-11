import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'
import router from './routes/auth.routes.js';
import { iniciarWhatsapp } from './services/whatsapp.services.js';
import cookieParser from 'cookie-parser';

dotenv.config({path: '../.env'});


const app = express();

app.use(cors({
    origin: ['https://magenta-ostrich-407854.hostingersite.com'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning']
}));

app.use(cookieParser());
app.use(express.json());

app.use(router);

iniciarWhatsapp();



app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
})