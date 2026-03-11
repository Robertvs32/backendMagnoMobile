const barbeiroModels = {

    buscaAgendamentosBarbeiro: async (id_barbeiro, id_cliente, dia) => {
        let sql = "SELECT * FROM AGENDAMENTOS WHERE id_profissional = ?"
        const valores = [id_barbeiro]

        if(id_cliente){
            valores.push(id_cliente);
            sql += "AND id_cliente = ?"
        }

        if(dia){
            valores.push(dia);
            sql += "AND dia = ?"
        }

        const [rows] = await pool.execute(sql, [...valores])
        return rows;
    }

}