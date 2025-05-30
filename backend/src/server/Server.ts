import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import './shared/services/TranslationsYup';
import { router } from './routes';

const server = express();

server.use(express.json());

server.disable('etag');
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use((req, res, next) => {

    server.use(cors());

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

server.use(router);

export { server };