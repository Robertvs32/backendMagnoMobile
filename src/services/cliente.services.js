import clienteModels from "../models/cliente.models.js";
import globalModels from "../models/global.models.js";

const clienteServices = {

    enviarFeedback: async (userId, mensagem, id_agendamento, campo) => {
        try{
            const id_cliente = await globalModels.buscarIdClienteAgendamento(id_agendamento);
            
            if(id_cliente != userId){
                throw new Error("Permissão negada!");
            }

            await clienteModels.enviarFeedback(mensagem, id_agendamento, campo);
        }catch(error){
            throw error
        }
    },

    cancelarAgendamentoCliente: async (id_agendamento, userId) => {
        const id_cliente = await globalModels.buscarIdClienteAgendamento(id_agendamento);

        if(!id_cliente){
            throw new Error("Erro ao buscar id do usuario!");
        }

        if(id_cliente != userId){
            throw new Error("Permissão negada!");
        }

        await clienteModels.cancelarAgendamentoCliente(id_agendamento);
    }
}

export default clienteServices;