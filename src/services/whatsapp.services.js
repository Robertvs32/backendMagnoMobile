import * as wppconnect from '@wppconnect-team/wppconnect';

let instanciaWhatsapp = null;
const URL = 'https://magenta-ostrich-407854.hostingersite.com'

export const iniciarWhatsapp = async () => { 
    try{
        const client = await wppconnect.create({
            session: 'barbearia-session',
            mkdirFolder: '../',
            folderNameToken: 'tokens',
            disableWelcome: true,
            tokenStore: 'file',
            waitForLogin: true,
            autoClose: 0, 
            puppeteerOptions: {
                executablePath: '/usr/bin/google-chrome-stable',
                headless: false,
                userDataDir: '../tokens/barbearia-session/browser-data'
            },
            catchQR: (base64Qr, asciiQR) => {
                console.log(asciiQR);
            }
        })

        instanciaWhatsapp = client;
        console.log("Whatsapp conectado!");

    }catch(error){
        console.log(error)
    }
}

export const enviarLinkConfirmacao = async (nome, uuid, celular) => {
    const link = `${URL}/${uuid}`;

    for(let i = 1; i <= 3; i++){
        try{
            await instanciaWhatsapp.sendText(`${celular}@c.us`,`Bem vindo(a) *${nome}*, confirme seu cadastro atraves do link: \n\n ${link}`);
            return
        }catch(error){
            await new Promise(res => setTimeout(res, 500));
        }
    }

    return null;
}
