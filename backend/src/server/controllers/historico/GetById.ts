import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { IParamsIdGlobal } from '../../shared/interfaces';
import { HistoricoProvider } from '../../models/historico';

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsIdGlobal>(yup.object().shape({
        id: yup.string().required().min(1).max(50)
    }))
}));

export const getById = async (req: Request<IParamsIdGlobal>, res: Response) => {

    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        });
    }

    const result = await HistoricoProvider.getById(req.params.id);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result);
};
