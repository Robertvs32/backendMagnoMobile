import globalModels from "../models/global.models.js";
import globalServices from "../services/global.services.js";

const globalController = {

    buscarServicos: async (req, res) => {
        try{
            const servicos = await globalModels.buscarServicos();
            res.status(200).json({...servicos});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao buscar servicos - ${error.message}`})
        }
    },

    buscarProfissionais: async (req, res) => {
        try{
            const profissionais = await globalModels.buscarProfissionais();
            res.status(200).json(profissionais);
        }catch(error){
            res.status(500).json({mensagem: `Erro ao buscar profissionais - ${error.message}`})
        }
    },

    buscarClientes: async (req, res) => {
        try{
            const clientes = await globalModels.buscarClientes();
            res.status(200).json(clientes);
        }catch(error){
            res.status(500).json({mensagem: `Erro ao buscar clientes - ${error.message}`})
        }
    },

    buscarAgendamentoId: async (req, res) => {
        try{
            const { id } = req.params;

            const agendamento = await globalModels.buscarAgendamentoId(id);

            res.status(200).json(agendamento);
        }catch(error){
            res.status(500).json({mensagem: `Erro ao buscar agendamento - ${error.message}`})
        }
    },

    concluiAgendamentoBarbeiro: async (req, res) => {
        try{
            const { id } = req.body;
            const id_barbeiro = req.userId

            await globalServices.concluiAgendamentoBarbeiro(id, id_barbeiro);

            res.status(200).json({mensagem: "Agendamento concluido!"});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao concluir agendamento: ${error.message}`});
        }
    },

    concluiAgendamentoAdm: async (req, res) => {
        try{
            const { id } = req.body;
            await globalModels.concluiAgendamento(id);

            res.status(200).json({mensagem: "Agendamento concluido!"});

        }catch(error){
            res.status(500).json({mensagem: `Erro ao finalizar agendamento: ${error.message}`});
        }
    }

}

export default globalController;