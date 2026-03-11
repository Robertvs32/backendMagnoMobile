import agendamentoModels from "../models/agendamento.models.js"
import { flatArrayAgendamentos } from "../utils/agendamentos.utils.js";
import globalServices from "./global.services.js";

const agendamentoServices = {

    agendar: async (objAgendamento) => {
        const { id_cliente, id_profissional, id_servico, dia, hora} = objAgendamento;

        const arrayHorarios = await agendamentoServices.buscaHorariosReservados(dia, id_profissional)
        const arrayBloqueios = await globalServices.buscarBloqueios(id_profissional, dia);

        if(arrayHorarios.includes(hora) || arrayBloqueios.includes(hora)){
            throw new Error("Horario indisponivel, selecione outro horario!");
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