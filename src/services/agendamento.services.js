import agendamentoModels from "../models/agendamento.models.js"

const agendamentoServices = {

    buscaHorariosReservados: async (dia, id_profissional) => {
        const arrayHorariosReservados = await agendamentoModels.buscaHorariosReservados(dia, id_profissional);
        const arrayDeArrays = arrayHorariosReservados.map(item => item.horas);
        const arrayDefinitivo = arrayDeArrays.flat();

        return arrayDefinitivo;
    },

    agendar: async (objAgendamento) => {
        const { id_cliente, id_profissional, id_servico, dia, horas} = objAgendamento;

        const arrayHorariosReservados = await agendamentoServices.buscaHorariosReservados(dia, id_profissional);
        const blocos = await agendamentoModels.verificaBlocosServico(id_servico);

        const arrayHoras = [];
        let horaAtual = horas[0]

        for(let i = 1; i <= blocos; i++){
            if(arrayHorariosReservados.includes(horaAtual)){    
                throw new Error("Horário indisponível, escolha outra opção!");
            }

            arrayHoras.push(horaAtual); //GUARDA A PRIMEIRA HORA NO ARRAY
            
            //PEGA OS VALORES HORA E MINUTO DO ARRAY GERADO PELO SPLIT QUE SEPARA A HORA(STRING) E CONVERTE PARA NUMERO
            const [hora, minuto] = horaAtual.split(":").map(Number);

            const minutosTotais = (hora * 60) + minuto; //PEGA OS MINUTOS TOTAIS DA HORA AGENDADA
            const minutosProx = minutosTotais + 30; //ACRESCENTA 30 MINUTOS PRO PROXIMO BLOCO (cASO TIVER)

            const novaHora = Math.floor(minutosProx / 60); //PEGA O VALOR DA HORA ARREDONDADO PRA BAIXO
            const novoMinuto = minutosProx % 60; //PEGA OS MINUTOS RESTANTES PELA SOBRA DA DIVISÃO DOS MINUTOS TOTAIS POR 60 MIN

            //TRANSFORMA EM STRING E ADICIONA 0 ANTES CASO PRECISE, PRO VALOR FICAR CORRETO: EX "09:00"
            const horaFinal = String(novaHora).padStart(2, "0");
            const minutoFinal = String(novoMinuto).padStart(2, "0")

            horaAtual = `${horaFinal}:${minutoFinal}`;
        }

        await agendamentoModels.agendar(id_cliente, id_profissional, id_servico, dia, arrayHoras);

    }

}

export default agendamentoServices