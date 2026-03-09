import servicosModels from "../models/servicos.models.js";

export const flatArrayAgendamentos = async (arrayAgendamentos) => {
    let arrayHorarios = [];

    for(const item of arrayAgendamentos){
        arrayHorarios.push(item.horario);

        const blocos = await servicosModels.buscarBlocoServico(item.id_servico);

        for(let i = 0; i < blocos - 1; i++){
            const [horas, minutos] = arrayHorarios[arrayHorarios.length - 1].split(':');

            const minutosAdicionado15 = (Number(horas) * 60) + Number(minutos) + 15;

            const novaHora = parseInt(minutosAdicionado15 / 60);
            const novoMinuto = (minutosAdicionado15 % 60);

            const stringHora = String(novaHora).padStart(2, "0");
            const stringMinuto = String(novoMinuto).padStart(2, "0");

            const horarioFinal = `${stringHora}:${stringMinuto}`;

            arrayHorarios.push(horarioFinal);
        }
    }

    return arrayHorarios
}