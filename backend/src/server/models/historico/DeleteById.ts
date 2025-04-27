import { db } from "../../database/lowdb";


export const deleteById = async (id: string): Promise<void | Error> => {
  try {
    const dbLow = await db;
    await dbLow.read(); // Lê os dados atualizados

    // Procurar histórico pelo id
    const historicoIndex = dbLow.data!.registros.findIndex(h => h.id === id);

    if (historicoIndex === -1) {
      return new Error('Não existe histórico com este ID');
    }

    // Deleta o histórico
    dbLow.data!.registros.splice(historicoIndex, 1); // Remove 1 elemento na posição encontrada
    await dbLow.write(); // Salva as alterações

    return;
  } catch (error) {
    console.error(error);
    return new Error('Erro ao apagar o registro');
  }
};
