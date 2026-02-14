import pool from "../database/pool.js";

const servicosModels = {

    atualizarValorServico: async (preco, id) => {
        const sql = "UPDATE servicos SET preco = ? WHERE id_servico = ?"
        await pool.execute(sql, [preco, id])
    },

    adicionaDiaOff: async (dia) => {
        const sql = "INSERT INTO dias_off(data_off) value(?) ";
        await pool.execute(sql, [dia])
    },

    buscarAgendamentosAdm : async () => {

        const sql = 
        `
            SELECT * FROM agendamentos
            ORDER BY dia DESC, horas DESC
            
        `
        const [row] = await pool.execute(sql);
    
        return row;
    },

    buscarAgendamentosAdmFiltro : async (id_cliente, id_profissional, dia) => {
        
        const id_p = id_profissional || null;
        const id_c = id_cliente || null;

        const sql = 
        `
            SELECT * FROM agendamentos
            WHERE (id_cliente = ? OR ? IS NULL)
            AND (id_profissional = ? OR ? IS NULL)
            AND dia = ?
            ORDER BY horas->>'$[0]' ASC
        `
        const [row] = await pool.execute(sql, [id_c,, id_c, id_p, id_p, dia]);
    
        return row;
    },

}

export default servicosModels;