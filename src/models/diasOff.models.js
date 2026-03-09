import pool from '../database/pool.js';

const diasOffModels = {

    adicionaDiaOff: async (dia) => {
        const sql = "INSERT INTO dias_off(data_off) value(?) ";
        await pool.execute(sql, [dia])
    },

    retiraDiaOff: async (id) => {
        const sql = "DELETE FROM dias_off WHERE id = ?";
        await pool.execute(sql, [id]);
    },

    buscarDiasOff: async () => {
        const sql = "SELECT * FROM dias_off";
        const [rows] = await pool.query(sql);
        return rows;
    }

}

export default diasOffModels;