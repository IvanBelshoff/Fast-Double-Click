import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { IHistoricoBody } from '../../shared/interfaces';
import { HistoricoProvider } from '../../models/historico';

export const createValidation = validation((getSchema) => ({
    body: getSchema<IHistoricoBody>(yup.object().shape({
        apelido: yup.string().optional().min(1).max(50),
        data_inicio: yup.date().required(),
        data_fim: yup.date().required(),
        duracao: yup.string().required(),
    }))
}));

export const create = async (req: Request<{}, {}, IHistoricoBody>, res: Response) => {

    const resulteHistorico = await HistoricoProvider.create({
        ...req.body,
    });

    if (resulteHistorico instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: JSON.parse(resulteHistorico.message)
        });
    }

    return res.status(StatusCodes.CREATED).json(resulteHistorico);

};
