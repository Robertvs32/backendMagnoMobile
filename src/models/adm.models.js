import pool from "../database/pool.js";

const admModels = {

    addFolgaProfissional: async (id) => {
        const sql = "INSERT INTO folga_profissionais(id_profissional, dia_da_semana) values(?, 0)"
        await pool.execute(sql, [id]);
    },

    desativarUsuario: async (id) => {
        const sql = "UPDATE usuarios SET status = 'desativado WHERE id = ?";
        const [row] = await pool.execute(sql, [id]);

        if(row.affectedRows == 1){
            return 1;
        }

        return 0;
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

export default admModels;