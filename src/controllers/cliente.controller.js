import clienteModels from "../models/cliente.models.js";
import clienteServices from "../services/cliente.services.js";

const clienteController = {

    buscarAgendamentosCliente: async (req, res) => {
        try{
            const { id_cliente } = req.body;
            const agendamentos = await clienteModels.buscarAgendamentosCliente(id_cliente);

            res.status(200).json({agendamentos});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao buscar agendamentos - ${error.message}`});
        }
    },

    buscarAgendamentosClienteFiltro: async (req, res) => {
        try{
            const { id_cliente, id_profissional, dia } = req.body;
            const agendamentos = await clienteModels.buscarAgendamentosClienteFiltro(id_cliente, id_profissional, dia);

            res.status(200).json({agendamentos});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao buscar agendamentos - ${error.message}`});
        }
    },

    enviarFeedback: async (req, res) => {
        try{
            const userId = req.userId;
            const { mensagem, id_agendamento, campo } = req.body

            await clienteServices.enviarFeedback(userId, mensagem, id_agendamento, campo);

            res.status(200).json({mensagem: "Feedback enviado!"});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao enviar feedback - ${error.message}`});
        }
    },

    cancelarAgendamentoCliente: async (req, res) => {
        try{
            const userId = req.userId;
            const id_agendamento = req.body.id_agendamento;

            await clienteServices.cancelarAgendamentoCliente(id_agendamento, userId);

            res.status(200).json({mensagem: "Agendamento cancelado!"});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao cancelar agendamento - ${error.message}`});
        }
    }

}

export default clienteController;