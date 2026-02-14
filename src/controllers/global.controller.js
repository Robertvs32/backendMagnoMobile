import globalModels from "../models/global.models.js";

const globalController = {

    buscarServicos: async (req, res) => {
        try{
            const servicos = await globalModels.buscarServicos();
            res.status(200).json({servicos});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao buscar servicos - ${error.message}`})
        }
    },

    buscarProfissionais: async (req, res) => {
        try{
            const profissionais = await globalModels.buscarProfissionais();
            res.status(200).json({profissionais});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao buscar profissionais - ${error.message}`})
        }
    },

    buscarAgendamentoId: async (req, res) => {
        try{
            const { id_agendamento } = req.body;

            const agendamento = await globalModels.buscarAgendamentoId(id_agendamento);

            res.status(200).json({agendamento});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao buscar agendamento - ${error.message}`})
        }
    },

    buscarClientes: async (req, res) => {
        try{
            const clientes = await globalModels.buscarClientes();
            res.status(200).json({clientes});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao buscar clientes - ${error.message}`})
        }
    },

}

export default globalController;