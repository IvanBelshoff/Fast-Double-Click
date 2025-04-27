import { db } from "../../database/lowdb";
import { parseISO, startOfDay, endOfDay, isWithinInterval, addDays, format } from 'date-fns';

export const count = async (
  query?: string,
  dates?: string
): Promise<number | Error> => {
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

    return historicos.length;

  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar os registros');
  }
};