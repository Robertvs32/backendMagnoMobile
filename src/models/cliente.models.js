import pool from "../database/pool.js"

const clienteModels = {

    enviarFeedback: async (mensagem, id_agendamento, campo) => {
        const sql =
        `
            UPDATE agendamentos SET feedback_${campo} = ? WHERE id = ? AND feedback_${campo} IS NULL
        `
        const [row] = await pool.execute(sql, [mensagem, id_agendamento]);

        if(row.affectedRows == 0){
            throw new Error("Feedback ja fornecido!");
        }

    },

    cancelarAgendamentoCliente: async (id_agendamento) => {
        const sql = 
        `
            UPDATE agendamentos SET status = 'cancelado' WHERE id = ? AND status <> 'cancelado'
        `
        const [row] = await pool.execute(sql, [id_agendamento]);
        
        if(row.affectedRows == 0){
            throw new Error("Agendamento ja esta cancelado!");
        }
    }
}

export default clienteModels;