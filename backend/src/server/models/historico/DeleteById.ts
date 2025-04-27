import { db } from "../../database/lowdb";

export const deleteById = async (id: string): Promise<void | Error> => {
  try {
    const dbLow = db;
    await dbLow.read(); 

    const historicoIndex = dbLow.data!.registros.findIndex(h => h.id === id);

    if (historicoIndex === -1) {
      return new Error('Não existe histórico com este ID');
    }

    dbLow.data!.registros.splice(historicoIndex, 1);
    await dbLow.write();

    return;
  } catch (error) {
    console.error(error);
    return new Error('Erro ao apagar o registro');
  }
};
