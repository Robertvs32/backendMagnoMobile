import agendamentoModels from "../models/agendamento.models.js"
import { flatArrayAgendamentos } from "../utils/agendamentos.utils.js";
import servicosModels from "../models/servicos.models.js";

const agendamentoServices = {

    agendar: async (objAgendamento) => {
        const { id_cliente, id_profissional, id_servico, dia, hora} = objAgendamento;

        const arrayHorarios = await buscaHorariosReservados(dia, id_profissional)

        if(arrayHorarios.includes(hora)){
            throw new Error("Horario ja agendado, selecione outro horario!");
        }

        await agendamentoModels.agendar(id_cliente, id_profissional, id_servico, dia, hora);
    },

    buscaHorariosReservados: async (dia, id_profissional) => {
        const arrayAgendamentos = await agendamentoModels.buscaAgendamentos(dia, id_profissional)
        const arrayHorarios = await flatArrayAgendamentos(arrayAgendamentos);

        return arrayHorarios;
    }

}

export default agendamentoServices