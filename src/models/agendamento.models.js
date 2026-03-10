import pool from "../database/pool.js";

const agendamentoModels = {

    buscaProfissionaisDisponiveis: async (diaSemana) => {
        const sql = 
        `
        SELECT u.nome, u.sobrenome, u.id
        FROM usuarios as u
        WHERE roles = 'barbeiro' AND status = 'ativo' AND verificado = true
        AND NOT EXISTS (
            SELECT 1
            FROM folga_profissionais as f
            WHERE u.id = f.id_profissional
            AND f.dia_semana = ?
        )
        `
        const [row] = await pool.execute(sql, [diaSemana]);

        return row;
    },

    buscaAgendamentos: async (dia, id_profissional) => {
        const sql = 
        `
            SELECT horario, id_servico FROM agendamentos 
            WHERE dia = ?
            AND id_profissional = ?
        `
        const [rows] = await pool.execute(sql, [dia, id_profissional]);
        return rows;
    },

    agendar: async (id_cliente, id_profissional, id_servico, dia, horas) => {
        const sql = 
        `
            INSERT INTO agendamentos (id_cliente, id_profissional, id_servico, dia, horario)
            VALUE(?, ?, ?, ?, ?)
        `
        await pool.execute(sql, [id_cliente, id_profissional, id_servico, dia, horas]);
    },

    verificaBlocosServico: async (id_servico) => {
        const sql = 
        `
            SELECT blocos FROM servicos WHERE id_servico = ?
        `
        const [row] = await pool.execute(sql, [id_servico]);
        return row[0].blocos;
    }

}

export default agendamentoModels;