import * as Create from './Create';
import * as DeleteById from './DeleteById';
import * as GetAll from './GetAll';

export const HistoricoController = {
    ...Create,
    ...DeleteById,
    ...GetAll
};