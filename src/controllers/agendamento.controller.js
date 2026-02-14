import agendamentoModels from '../models/agendamento.models.js'
import agendamentoServices from '../services/agendamento.services.js';

const agendamentoController = {

    verificaDiaOff: async (req, res) => {
        try{
            const { dia } = req.body;
            const result = await agendamentoModels.verificaDiaOff(dia);

            res.status(200).json({resultado: result});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao verificar dia off - ${error}`});
        }   
    },

    buscaProfissionaisDisponiveis: async (req, res) => {
        try{
            const { diaSemana } = req.body;
            const arrayProfissionais = await agendamentoModels.buscaProfissionaisDisponiveis(diaSemana);

            res.status(200).json({arrayProfissionais});
        }catch(error){
            res.status(404).json({mensagem: `Não foi possível buscar profissionais! ${error}`});
        }
    },

    buscaHorariosReservados: async (req, res) => {
        try{
            const { dia, id_profissional } = req.body;
            const arrayHorariosReservados = await agendamentoServices.buscaHorariosReservados(dia, id_profissional);

            res.status(200).json({ arrayHorariosReservados })
        }catch(error){
            res.status(500).json({mensagem: `Erro ao buscar horários reservados - ${error}`});
        }
    },

    agendar: async (req, res) => {
        try{
            const objAgendamento = req.body;
            await agendamentoServices.agendar(objAgendamento);

            res.status(200).json({mensagem: "Agendamento realizado com sucesso!"});
        }catch(error){
            res.status(500).json({mensagem: `Erro ao agendar - ${error.message}`});
        }
        
    }

}

export default agendamentoController;