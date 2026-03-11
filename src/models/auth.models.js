import pool from '../database/pool.js';

const authModels = {

    cadastrarCliente: async ({ uuid, nome, sobrenome, celular, email, cep, numero, senha}) => {
        const sqlCadastro = "INSERT INTO usuarios(uuid, nome, sobrenome, celular, email, hash_senha, cep, numero, roles) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'cliente')";

        await pool.execute(sqlCadastro, [uuid, nome, sobrenome, celular, email, senha, cep, numero]); 
    },

    cadastrarProfissional: async ({ uuid, nome, sobrenome, celular, email, cep, numero, senha}) => {
        const sqlCadastro = "INSERT INTO usuarios(uuid, nome, sobrenome, celular, email, hash_senha, cep, numero, roles) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'barbeiro')";

        const [row] = await pool.execute(sqlCadastro, [uuid, nome, sobrenome, celular, email, senha, cep, numero]); 
        return row.insertId;
    },

    buscaVerificado: async (uuid) => {
        const sql = 'SELECT verificado from usuarios WHERE uuid = ?';
        const [row] = await pool.execute(sql, [uuid]);

        if(row.length > 0){
            return row[0].verificado;
        }

        throw new Error("Usuário não encontrado!");
    },

    verificarUsuario: async (uuid) => {
        const sql = 'UPDATE usuarios SET verificado = 1 WHERE uuid = ?'
        const [result] = await pool.execute(sql, [uuid]);

        if(result.affectedRows == 0){
            throw new Error("Erro ao verificar usuário!");
        }
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

export default authModels;

