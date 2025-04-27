import * as Create from './Create';
import * as DeleteById from './DeleteById';
import * as GetAll from './GetAll';
import * as GetById from './GetById';

export const HistoricoController = {
    ...Create,
    ...DeleteById,
    ...GetAll,
    ...GetById
};