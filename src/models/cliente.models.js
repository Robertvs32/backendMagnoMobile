import pool from "../database/pool.js"

const clienteModels = {

    buscarAgendamentosCliente : async (id_cliente) => {

        const sql = 
        `
            SELECT * FROM agendamentos
            WHERE id_cliente = ?
            ORDER BY dia DESC, horas DESC
            
        `
        const [row] = await pool.execute(sql, [id_cliente]);
    
        return row;

    },

    buscarAgendamentosClienteFiltro : async (id_cliente, id_profissional, dia) => {
        
        const id_p = id_profissional || null;

        const sql = 
        `
            SELECT * FROM agendamentos
            WHERE id_cliente = ?
            AND (id_profissional = ? OR ? IS NULL)
            AND dia = ?
            ORDER BY horas->>'$[0]' ASC
        `
        const [row] = await pool.execute(sql, [id_cliente, id_p, id_p, dia]);
    
        return row;
        
    },

    enviarFeedback: async (mensagem, id_agendamento, campo) => {
        const sql =
        `
            UPDATE agendamentos SET feedback_${campo} = ? WHERE id_agendamento = ?
        `
        await pool.execute(sql, [mensagem, id_agendamento])
    },

    cancelarAgendamentoCliente: async (id_agendamento) => {
        const sql = 
        `
            UPDATE agendamentos SET status = 'cancelado' WHERE id_agendamento = ?
        `
        await pool.execute(sql, [id_agendamento])
    }
}

export default clienteModels;