import pool from "../database/pool.js"

const servicosModels = {

    atualizarValorServico: async (preco, id) => {
        const sql = "UPDATE servicos SET preco = ? WHERE id_servico = ?"
        await pool.execute(sql, [preco, id])
    },

    desativarServico: async (id) => {
        const sql = "UPDATE servicos SET status = 'desativado' WHERE id = ?";
        const [result] = await pool.execute(sql, [id]);

        return result.affectedRows;
    },  

    cadastrarServico: async (nome, blocos, preco) => {
        const sql = "INSERT INTO servicos(nome, blocos, preco) VALUES(?, ?, ?)";
        const [result] = await pool.execute(sql, [nome, blocos, preco]);

        return result.affectedRows;
    },

    buscarBlocoServico: async (id) => {
        const sql = "SELECT blocos FROM servicos WHERE id = ?";
        const [row] = await pool.execute(sql, [id]);

        return row[0].blocos;
    }

}

export default servicosModels;