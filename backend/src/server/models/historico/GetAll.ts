import { filter } from "lodash";
import { db } from "../../database/lowdb";
import { IHistorico } from "../../shared/interfaces";

export const getAll = async (
  query?: string,
  sort?: string,
): Promise<IHistorico[] | Error> => {
  try {
    await db.read()
    const dbLow = db.chain.get('registros')

    // Recupera todos os históricos
    const historicos = dbLow.value() || [];

    if (sort && typeof sort === 'string') {

      const atributo = sort.split('.')[0];
      const ordem = sort.split('.')[1];

      const historicosOrdenados = historicos.sort((a, b) => {
        let aValue: any = a[atributo as keyof IHistorico];
        let bValue: any = b[atributo as keyof IHistorico];

        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();

        if (aStr < bStr) return ordem == 'desc' ? 1 : -1;
        if (aStr > bStr) return ordem == 'asc' ? -1 : 1;

        return 0;
      });

      if (query && typeof query === 'string') {

        console.log('query', query)

        const historicosFiltrados = filter(historicosOrdenados, (historico) => {
          const valor = String(historico[atributo as keyof IHistorico]).toLowerCase();
          return valor.includes(query.toLowerCase());
        });

        return historicosFiltrados;
      }

      return historicosOrdenados;

    }

    if (query && typeof query === 'string') {

      const historicosFiltrados = filter(historicos, (historico) => {
        const valor = String(historico).toLowerCase();
        return valor.includes(query.toLowerCase());
      });
      return historicosFiltrados;

    }


    return historicos; // Retorna os registros

  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar os registros');
  }
};
