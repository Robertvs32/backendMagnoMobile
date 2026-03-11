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
    },

    buscarAgendamentosCliente: async (id_cliente, dia, id_barbeiro) => {
        const sql = 
        `
            SELECT * FROM agendamentos 
            WHERE id_cliente = ?
        `
        const valores = [id_cliente];

        if(dia){
            sql += "AND dia = ?"
            valores.push(dia)
        }

        if(id_barbeiro){
            sql += "AND id_profissional = ?"
            valores.push(id_barbeiro)
        }

        const [rows] = await pool.execute(sql);
        return rows;

    }
}

export default clienteModels;