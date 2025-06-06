import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HistoricoProvider } from '../../models/historico';
import { validation } from '../../shared/middlewares';
import { IGetAllHistoricoQuery } from '../../shared/interfaces';
import * as yup from 'yup';

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IGetAllHistoricoQuery>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
        sort: yup.string().optional(),
        dates: yup.string().optional()
    }))
}));

export const getAll = async (req: Request<{}, {}, {}, IGetAllHistoricoQuery>, res: Response) => {

    const result = await HistoricoProvider.getAll(
        req.query.filter,
        req.query.sort,
        req.query.dates
    );

    const count = await HistoricoProvider.count(
        req.query.filter,
        req.query.dates
    );

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        });
    } else if (count instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message }
        });
    }

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);

    return res.status(StatusCodes.OK).json(result);
};
