import * as wppconnect from '@wppconnect-team/wppconnect';

let instanciaWhatsapp = null;

export const iniciarWhatsapp = () => { 
    wppconnect.create({
        session: 'barbearia-session-whatsapp',
        mkdirFolder: '../',
        folderNameToken: 'tokens',
        disableWelcome: true,
        tokenStore: 'file',
        waitForLogin: true,
        autoClose: 0, 
        puppeteerOptions: {
            headless: true,
            userDataDir: '../tokens/barbearia-session-whatsapp/browser-data'
        },
        catchQR: (base64Qr, asciiQR) => {
            console.log(asciiQR);
        }
    })
    .then(client => {
        instanciaWhatsapp = client;
        console.log("Whatsapp conectado!");
    }) 
    .catch(error => {
        console.log(error)
    });
}

export const enviarLinkConfirmacao = async (nome, uuid, celular) => {
    const link = `magenta-ostrich-407854.hostingersite.com/${uuid}`
    return await instanciaWhatsapp.sendText(`${celular}@c.us`,`Bem vindo(a) *${nome}*, confirme seu cadastro atraves do link: \n\n ${link}`);
}