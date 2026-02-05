import db from '../database/db.js';

const authModels = {

    cadastrar: async ({ uuid, nome, sobrenome, celular, email, cep, numero, roles, senha }) => {
        const sqlCadastro = "INSERT INTO usuarios(uuid, nome, sobrenome, celular, email, senha, cep, numero, roles) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        await db.execute(sqlCadastro, [uuid, nome, sobrenome, celular, email, senha, cep, numero, roles ]); 
    },

    buscaUserEmail: async (email) => {
        const sqlBuscaUser = "SELECT * FROM usuarios WHERE email = (?)";

        const [resultBuscaUser] = await db.execute(sqlBuscaUser, [email]);
        if(resultBuscaUser.length > 0){
            return resultBuscaUser[0];
        }
        return null;
    },

    guardarRefreshToken: async (id, refreshToken) => {
        const sql = "UPDATE usuarios SET refresh_token = ? WHERE id = ?";
        await db.execute(sql, [refreshToken, id]);
    },

    buscarUserId: async (id) => {
        const [row] = await db.execute("SELECT * FROM usuarios WHERE id = ?", [id]);
        if(row.length > 0){
            return row[0];
        }
        return null;
    },

    buscaVerificado: async (uuid) => {
        const sql = 'SELECT verificado from usuarios WHERE uuid = ?';
        const [row] = await db.execute(sql, [uuid]);

        if(row.length > 0){
            return row[0].verificado;
        }

        throw new Error("Usuário não encontrado!");
    },

    verificarUsuario: async (uuid) => {
        const sql = 'UPDATE usuarios SET verificado = 1 WHERE uuid = ?'
        const [result] = await db.execute(sql, [uuid]);

        if(result.affectedRows == 0){
            throw new Error("Erro ao verificar usuário!");
        }
    }

}

export default authModels;

