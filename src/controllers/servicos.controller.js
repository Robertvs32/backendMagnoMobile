import servicosModels from "../models/servicos.models.js";

const servicosController = {

    atualizarValorServico: async (req, res) => {
        try{
            const { preco, id } = req.body;
            await servicosModels.atualizarValorServico(preco, id);

            res.status(200).json({mensagem: `Servico id(${id}), alterado para R$${preco}!`});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao atualizar valor - ${error}`});
        }
    },

    desativarServico: async (req, res) => {
        try{
            const { id } = req.body;
            const result = await servicosModels.desativarServico(id);

            if(result === 0){
                throw new Error("Servico nao encontrado!");
            }

            res.status(200).json({mensagem: `Servico id:${id}, desativado!`});
        }catch(error){
            res.status(500).json({mensagem: error?.message || 'Erro ao desativar servico'})
        }
    },

    cadastrarServico: async (req, res) => {
        try{
            const { nome, blocos, preco } = req.body;
            const result = await servicosModels.cadastrarServico(nome, blocos, preco);
            
            if(result === 0){
                throw new Error("Erro ao cadastrar servico");
            }

            res.status(200).json({mensagem: "Servico cadastrado com sucesso!"});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao cadastrar servico - ${error}`});
        }
    }

}

export default servicosController;