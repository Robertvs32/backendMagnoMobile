import pool from '../database/pool.js';

const diasOffModels = {

    adicionaDiaOff: async (dia) => {
        const sql = "INSERT INTO dias_off(data_off) value(?) ";
        await pool.execute(sql, [dia])
    },

    retiraDiaOff: async (id) => {
        const sql = "DELETE FROM dias_off WHERE id = ?";
        const [row] = await pool.execute(sql, [id]);

        if(row.affectedRows == 0){
            throw new Error("Data nao encontrada!");
        }
    },

    buscaDiasOff: async () => {
        const sql = "SELECT * FROM dias_off";
        const [rows] = await pool.query(sql);
        return rows;
    },

    verificaDiaOff: async (dia) => {
        const sql = "SELECT * FROM dias_off WHERE data_off = ?";
        const [row] = await pool.execute(sql, [dia]);

        if(row.length == 0){
            return false;
        }

        return true
    },

}

export default diasOffModels;