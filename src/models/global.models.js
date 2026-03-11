import pool from "../database/pool.js";

const globalModels = {

    buscarServicos: async () => {
        const sql = "SELECT * from servicos WHERE status = 'ativo'";
        const [servicos] = await pool.execute(sql)

        return servicos;
    },

    buscarProfissionais: async () => {
        const sql = "SELECT nome, email, id FROM usuarios WHERE roles = 'barbeiro'";
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
            SELECT * FROM agendamentos WHERE id = ?
        `
        const [row] = await pool.execute(sql, [id_agendamento]);

        if(row.length == 0){
            throw new Error("Agendamento nao encontrado!");
        }
        
        return row[0];
    },

    buscarIdClienteAgendamento: async (id_agendamento) => {
        const sql = 
        `
            SELECT id_cliente FROM agendamentos WHERE id = ?
        `
        const [row] = await pool.execute(sql, [id_agendamento]);

        return row[0].id_cliente;
    },

    buscarIdBarbeiroAgendamento: async (id_agendamento) => {
        const sql = 
        `
            SELECT id_profissional FROM agendamentos WHERE id = ?
        `
        const [row] = await pool.execute(sql, [id_agendamento]);

        if(row.lenght == 0){
            throw new Error("Erro ao verificar agendamento (barbeiro id)");
        }

        return row[0].id_profissional;
        
    },
    
    concluiAgendamento: async (id) => {
        const sql = "UPDATE agendamentos SET status = 'concluido' WHERE id = ? AND status <> 'concluido' ";
        const [row] = await pool.execute(sql, [id]);
        
        if(row.affectedRows == 0){
            throw new Error("Erro ao concluir agendamento, verifique se ja esta concluido!");
        }
    },

    cancelaAgendamento: async (id) => {
        const sql = "UPDATE agendamentos SET status = 'cancelado' WHERE id = ? AND status <> 'concluido'";
        const [row] = await pool.execute(sql, [id]);

        if(row.affectedRows == 0){
            throw new Error("Erro ao cancelar agendamento, verifique se ja esta cancelado!");
        }
    },

    buscarBloqueios: async (id_profissional, dia) => {
        const sql = "SELECT horarios FROM bloqueios WHERE id_profissional = ? AND dia = ?";
        const [rows] = await pool.execute(sql, [id_profissional, dia]);

        return rows;
    },

    bloquearHorario: async (id_profissional, dia, horas) => {
        const sql = "INSERT INTO bloqueios(id_profissional, dia, horas) VALUES(?, ?, ?)"
        await pool.execute(sql, [id_profissional, dia, horas]);
    }
    
}

export default globalModels;