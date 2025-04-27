import { db } from "../../database/lowdb";
import { IHistorico } from "../../shared/interfaces";
import { parseISO, startOfDay, endOfDay, isWithinInterval, addDays, format } from 'date-fns';

export const getAll = async (
  query?: string,
  sort?: string,
  dates?: string
): Promise<IHistorico[] | Error> => {
  try {
    await db.read();
    const dbLow = db.chain.get('registros');

    let historicos = dbLow.value() || [];

    if (query && typeof query === 'string') {
      const queryLower = query.toLowerCase();

      historicos = historicos.filter((historico) => {
        return (
          historico.apelido.toLowerCase().includes(queryLower) ||
          historico.duracao.toLowerCase().includes(queryLower)
        );
      });
    }

    if (dates && typeof dates === 'string') {

      const datesParts = dates.split('>');
      const dataInicio = datesParts[0]?.trim() ? addDays(startOfDay(new Date(datesParts[0].trim())), 1) : undefined;
      const dataFim = datesParts[1]?.trim() ? addDays(endOfDay(new Date(datesParts[1].trim())), 1) : undefined;

      if (dataInicio && dataFim) {

        historicos = historicos.filter((historico) => {
          let dataRegistro = historico.data_registro;

          if (typeof dataRegistro === 'string') {
            dataRegistro = parseISO(dataRegistro);
          }

          if (!(dataRegistro instanceof Date) || isNaN(dataRegistro.getTime())) {
            return false;
          }

          return isWithinInterval(dataRegistro, { start: dataInicio, end: dataFim });
        });
      }

      if (dataInicio && !dataFim) {

        historicos = historicos.filter((historico) => {
          let dataRegistro = historico.data_registro;

          if (typeof dataRegistro === 'string') {
            dataRegistro = parseISO(dataRegistro);
          }

          if (!(dataRegistro instanceof Date) || isNaN(dataRegistro.getTime())) {
            return false;
          }

          return format(dataRegistro, 'yyyy-MM-dd') == format(dataInicio, 'yyyy-MM-dd');
        });
      }

      if (!dataInicio && dataFim) {
        historicos = historicos.filter((historico) => {
          let dataRegistro = historico.data_registro;

          if (typeof dataRegistro === 'string') {
            dataRegistro = parseISO(dataRegistro);
          }

          if (!(dataRegistro instanceof Date) || isNaN(dataRegistro.getTime())) {
            return false;
          }

          return format(dataRegistro, 'yyyy-MM-dd') == format(dataFim, 'yyyy-MM-dd');
        });
      }
    }

    let atributo = 'data_registro'; 
    let ordem = 'desc';             

    if (sort && typeof sort === 'string') {
      const sortParts = sort.split('.');
      atributo = sortParts[0];
      ordem = sortParts[1] || 'asc';
    }

    historicos = historicos.sort((a, b) => {
      let aValue = a[atributo as keyof IHistorico];
      let bValue = b[atributo as keyof IHistorico];

      if (typeof aValue === 'string' && atributo.startsWith('data_')) {
        aValue = new Date(aValue);
      }
      if (typeof bValue === 'string' && atributo.startsWith('data_')) {
        bValue = new Date(bValue);
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        if (aValue < bValue) return ordem === 'asc' ? -1 : 1;
        if (aValue > bValue) return ordem === 'asc' ? 1 : -1;
      } else {

        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();

        if (aStr < bStr) return ordem === 'asc' ? -1 : 1;
        if (aStr > bStr) return ordem === 'asc' ? 1 : -1;
      }

      return 0;
    });

    return historicos;

  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar os registros');
  }
};
