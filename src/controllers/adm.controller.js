import admModels from "../models/adm.models.js";

const admController = {

    atualizarValorServico: async (req, res) => {
        try{
            const { preco, id } = req.body;
            await servicosModels.atualizarValorServico(preco, id);

            res.status(200).json({mensagem: `Servico id(${id}), alterado para R$${preco}!`});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao atualizar valor - ${error}`});
        }
    },

    adicionaDiaOff: async (req, res) => {
        try{
            const { dia } = req.body;
            await admModels.adicionaDiaOff(dia);
            res.status(200).json({mensagem: "Dia off adicionado!"})
        }catch(error){
            res.status(500).json({mensagem: `Erro ao adicionar dia off ${error}`})
        }
    },

    buscarAgendamentosAdm: async (req, res) => {
        try{
            const agendamentos = await admModels.buscarAgendamentosAdm();

            res.status(200).json({agendamentos});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao buscar agendamentos - ${error.message}`});
        }
    },

    buscarAgendamentosAdmFiltro: async (req, res) => {
        try{
            const { id_cliente, id_profissional, dia } = req.body;
            const agendamentos = await admModels.buscarAgendamentosAdmFiltro(id_cliente, id_profissional, dia);

            res.status(200).json({agendamentos});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao buscar agendamentos - ${error.message}`});
        }
    },

}

export default admController;