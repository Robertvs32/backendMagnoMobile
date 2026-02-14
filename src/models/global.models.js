import pool from "../database/pool.js";

const globalModels = {

    buscarServicos: async () => {
        const sql = "SELECT * from servicos";
        const [servicos] = await pool.execute(sql)

        return servicos;
    },

    buscarProfissionais: async () => {
        const sql = "SELECT nome, id FROM usuarios WHERE roles = 'barbeiro'";
        const [profissionais] = await pool.execute(sql);

        return profissionais;
    },

    buscarClientes: async () => {
        const sql = "SELECT nome, sobrenome, id, email FROM usuarios WHERE roles = 'cliente'";
        const [clientes] = await pool.execute(sql);

        return clientes;
    },

    buscarAgendamentoId: async (id_agendamento) => {
        const sql = 
        `
            SELECT * FROM agendamentos WHERE id_agendamento = ?
        `
        const [row] = await pool.execute(sql, [id_agendamento]);
        const agendamento = row[0];
        
        return agendamento;
    },

    buscarIdClienteAgendamento: async (id_agendamento) => {
        const sql = 
        `
            SELECT id_cliente FROM agendamentos WHERE id_agendamento = ?
        `
        const [row] = await pool.execute(sql, [id_agendamento]);

        return row[0].id_cliente;
    }

}

export default globalModels;