import * as Create from './Create';
import * as DeleteById from './DeleteById';
import * as GetAll from './GetAll';
import * as Count from './Count';

export const HistoricoProvider = {
    ...Create,
    ...DeleteById,
    ...GetAll,
    ...Count
};