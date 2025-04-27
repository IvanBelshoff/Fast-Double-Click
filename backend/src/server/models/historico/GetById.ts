import { db } from "../../database/lowdb";
import { IHistorico } from "../../shared/interfaces";


export const getById = async (id: string): Promise<IHistorico | Error> => {

    try {

        const dbLow = await db;
        await dbLow.read(); // Lê os dados atualizados
        
        // Procurar histórico pelo id
        const historicoIndex = dbLow.data!.registros.findIndex(h => h.id === id);

        if (historicoIndex === -1) {
            return new Error('Não existe histórico com este ID');
        }

        // Retorna o histórico encontrado
        const historico = dbLow.data!.registros[historicoIndex];
        if (historico) {
            return historico;
        }

        return new Error('Registro não encontrado');

    } catch (error) {
        console.log(error);
        return new Error('Registro não encontrado');
    }
};