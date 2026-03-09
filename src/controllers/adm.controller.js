import admModels from "../models/adm.models.js";

const admController = {

    desativarUsuario: async (req, res) => {
        try{
            const { id } = req.body;
            const result = await admModels.desativarUsuario(id);
            if(result === 0){
                throw new Error("Erro ao desativar usuario");
            }
            res.status(200).json({mensagem: "Usuario desativado com sucesso!"});
        }catch(error){
            res.status(500).json({mensagem: "Erro ao desativar usuario"});
        }
        
    }

}

export default admController