import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HistoricoController } from '../controllers/historico';

const router = Router();

router.get('/', (_, res) => {
    return res.status(StatusCodes.OK).send('Tudo certo');
});

router.post('/historico', HistoricoController.createValidation, HistoricoController.create);
router.get('/historico', HistoricoController.getAll);
router.delete('/historico/:id', HistoricoController.deleteByIdValidation, HistoricoController.deleteById);

export { router };