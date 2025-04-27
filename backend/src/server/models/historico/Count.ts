import { db } from "../../database/lowdb";

export const count = async (): Promise<number | Error> => {
  try {

    await db.read()
    const dbLow = db.chain.get('registros')

    // Recupera todos os históricos
    const historicos = dbLow.value() || [];

    return historicos.length; // Retorna os registros
  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar os registros');
  }
};