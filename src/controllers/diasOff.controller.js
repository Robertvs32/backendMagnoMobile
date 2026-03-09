import diasOffModels from "../models/diasOff.models.js";

const diasOffController = {

    retiraDiaOff: async () => {
        try{
            const { id_dia_off } = req.body;
            await diasOffModels.retiraDiaOff(id_dia_off);
            res.status(200).body({mensagem: "Dia off retirado!"});
        }catch(error){
            res.status(400).json({mensagem: "Erro ao retirar dia off!"});
        }
    },

    adicionaDiaOff: async (req, res) => {
        try{
            const { dia } = req.body;
            await diasOffModels.adicionaDiaOff(dia);
            res.status(200).json({mensagem: "Dia off adicionado!"})
        }catch(error){
            res.status(500).json({mensagem: `Erro ao adicionar dia off ${error}`})
        }
    },

    buscarDiasOff: async () => {
        try{
            const rows = await diasOffModels.buscarDiasOff();
            if(!rows){
                throw new Error("Erro ao buscar dias off!");
            }
            res.status(200).json({diasOff});
        }catch(error){
            res.status(400).json({mensagem});
        }   
        
    },

}

export default diasOffController;