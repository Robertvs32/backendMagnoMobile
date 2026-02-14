import pool from "../database/pool.js";

const agendamentoModels = {

    verificaDiaOff: async (dia) => {
        const sql = "SELECT * FROM dias_off WHERE data_off = ?";
        const [row] = await pool.execute(sql, [dia]);

        if(row.length == 0){
            return false;
        }

        return true
    },

    buscaProfissionaisDisponiveis: async (diaSemana) => {
        const sql = 
        `
        SELECT u.nome, u.sobrenome, u.id
        FROM usuarios as u
        WHERE roles = 'barbeiro'
        AND NOT EXISTS (
            SELECT 1
            FROM folga_profissionais as f
            WHERE u.id = f.id_profissional
            AND f.dia_da_semana = ?
        )
        `
        const [row] = await pool.execute(sql, [diaSemana]);

        return row;
    },

    buscaHorariosReservados: async (dia, id_profissional) => {
        const sql = 
        `
            SELECT horas FROM agendamentos 
            WHERE dia = ?
            AND id_profissional = ?
        `
        const [row] = await pool.execute(sql, [dia, id_profissional]);
        return row;
    },

    agendar: async (id_cliente, id_profissional, id_servico, dia, horas) => {
        const sql = 
        `
            INSERT INTO agendamentos (id_cliente, id_profissional, id_servico, dia, horas)
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