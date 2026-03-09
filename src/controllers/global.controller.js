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

    buscarClientes: async (req, res) => {
        try{
            const clientes = await globalModels.buscarClientes();
            res.status(200).json({clientes});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao buscar clientes - ${error.message}`})
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

    buscarAgendamentos: async (req, res) => {
        try{
            const { id_cliente, id_profissional, dia } = req.body;
            const agendamentos = await clienteModels.buscarAgendamentos(id_cliente, id_profissional, dia);

            res.status(200).json({agendamentos});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao buscar agendamentos - ${error.message}`});
        }
    }

}

export default globalController;