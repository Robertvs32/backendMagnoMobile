import pool from "../database/pool.js";

const admModels = {

    addFolgaProfissional: async (id) => {
        const sql = "INSERT INTO folga_profissionais(id_profissional, dia_semana) values(?, 0)"
        await pool.execute(sql, [id]);
    },

    desativarUsuario: async (id) => {
        const sql = "UPDATE usuarios SET status = 'desativado' WHERE id = ?";
        const [row] = await pool.execute(sql, [id]);

        if(row.affectedRows == 1){
            return 1;
        }

        return 0;
    },

    buscarAgendamentosAdm : async (id_cliente, id_profissional, dia) => {

        let sql = "SELECT * FROM agendamentos WHERE 1 + 1"
        const valores = []

        if(id_cliente){
            sql += ` AND id_cliente = ?`;
            valores.push(id_cliente)
        }


        if(id_profissional){
            sql += ` AND id_profissional = ?`;
            valores.push(id_profissional)
        }


        if(dia){
            sql += ` AND dia = ?`;
            valores.push(dia)
        }   

        const [rows] = await pool.execute(sql, [...valores]);
    
        return rows;
    },

    buscarUserId: async (id) => {
        const [row] = await pool.execute("SELECT * FROM usuarios WHERE id = ?", [id]);
        if(row.length > 0){
            return row[0];
        }
        return null;
    },

    buscaUserEmail: async (email) => {
        const sqlBuscaUser = "SELECT * FROM usuarios WHERE email = (?)";

        const [resultBuscaUser] = await pool.execute(sqlBuscaUser, [email]);
        if(resultBuscaUser.length > 0){
            return resultBuscaUser[0];
        }
        return null;
    },

}

export default admModels;