import diasOffModels from "../models/diasOff.models.js";

const diasOffController = {

    retiraDiaOff: async (req, res) => {
        try{
            const { id_dia_off } = req.body;
            await diasOffModels.retiraDiaOff(id_dia_off);
            res.status(200).json({mensagem: "Dia off retirado!"});
        }catch(error){
            res.status(400).json({mensagem: `Erro ao retirar dia off! ${error.message}`});
        }
    },

    adicionaDiaOff: async (req, res) => {
        try{
            const { dia }= req.body;
            console.log(dia);
            await diasOffModels.adicionaDiaOff(dia);
            res.status(200).json({mensagem: "Dia off adicionado!"})
        }catch(error){
            res.status(500).json({mensagem: `Erro ao adicionar dia off ${error}`})
        }
    },

    buscaDiasOff: async (req, res) => {
        try{
            const diasOff = await diasOffModels.buscaDiasOff();

            if(!diasOff){
                throw new Error("Erro ao buscar dias off!");
            }

            res.status(200).json({...diasOff});
        }catch(error){
            res.status(400).json({mensagem: error.message});
        }   
        
    },

    verificaDiaOff: async (req, res) => {
        try{
            const { dia } = req.params;
            const result = await diasOffModels.verificaDiaOff(dia);

            res.status(200).json({resultado: result});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao verificar dia off - ${error}`});
        }   
    },

}

export default diasOffController;