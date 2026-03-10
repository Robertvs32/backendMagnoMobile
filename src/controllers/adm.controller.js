import admModels from "../models/adm.models.js";

const admController = {

    desativarUsuario: async (req, res) => {
        try{
            const { id } = req.body;
            const result = await admModels.desativarUsuario(id);

            if(result === 0){
                throw new Error("Usuario nao encontrado!");
            }

            res.status(200).json({mensagem: "Usuario desativado com sucesso!"});
        }catch(error){
            res.status(500).json({mensagem: error?.message || "Erro ao desativar usuario"});
        }
    },

    buscarAgendamentosAdm : async (req, res) => {
        try{
            const { id_cliente, id_profissional, dia } = req.body;
            const agendamentos = await admModels.buscarAgendamentosAdm(id_cliente, id_profissional, dia);

            res.status(200).json({...agendamentos});


        }catch(error){
            res.status(500).json({mensagem: error?.message || "Erro ao buscar agendamentos"});
        }
    }

}

export default admController