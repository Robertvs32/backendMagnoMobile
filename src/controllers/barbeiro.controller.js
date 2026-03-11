import globalModels from "../models/global.models";

const barbeiroController = {

    cancelaAgendamentoBarbeiro: async (req, res) => {
        try{
            const { id } = req.body;
            await globalModels.cancelaAgendamento(id);
            res.status(200).json({mensagem: "Agendamento cancelado!"});
        }catch(error){
            res.status(200).json({mensagem: "Erro ao cancelar agendamento!"});
        }
    },

    buscaAgendamentosBarbeiro: async (req, res) => {
        try{
            const { id_barbeiro } = req.userId;
            const { id_cliente, dia } = req.body;

            const agendamentos = await barbeiroModels.buscaAgendamentosBarbeiro(id_barbeiro, id_cliente, dia)

            res.status(200).json({agendamentos});

        }catch(error){
            res.status(500).json({mensagem: "Erro ao buscar agendamentos!"})
        }
    }

}

export default barbeiroController