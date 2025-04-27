import { db } from "../../database/lowdb";
import { IHistorico, IHistoricoBody } from "../../shared/interfaces";
import { randomUUID } from "crypto";
import { faker } from '@faker-js/faker';

export const create = async (historico: IHistoricoBody): Promise<string | Error> => {
  try {
    await db.read();

    const apelido = historico.apelido?.trim() || faker.person.fullName();

    const novoHistorico: IHistorico = {
      id: randomUUID(),
      apelido,
      data_inicio: historico.data_inicio,
      data_fim: historico.data_fim,
      data_registro: new Date(),
      duracao: historico.duracao,
    };

    db.data!.registros.push(novoHistorico);
    await db.write();

    return novoHistorico.id;
  } catch (error) {
    console.error(error);
    return new Error("Erro ao cadastrar o registro");
  }
};
