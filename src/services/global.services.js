import globalModels from "../models/global.models.js"

const globalServices = {
    
    concluiAgendamentoBarbeiro: async (id, id_barbeiro) => {
        const id_barbeiro_agendamento = await globalModels.buscarIdBarbeiroAgendamento(id);

        console.log(id_barbeiro_agendamento == id_barbeiro)
        console.log(id_barbeiro_agendamento)
        console.log(id_barbeiro)

        if(id_barbeiro_agendamento != id_barbeiro){
            throw new Error("Permissao negada!");
        }

        await globalModels.concluiAgendamento(id);
    }

}

export default globalServices;