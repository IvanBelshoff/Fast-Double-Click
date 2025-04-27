import { JSONFile } from 'lowdb/node';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { IHistorico } from '../shared/interfaces';
import lodash from 'lodash';
import { Low } from 'lowdb'

type Data = {
  registros: IHistorico[];
};

const defaultData: Data = { registros: [] };

const filePath = path.resolve(__dirname, 'registros.json');

const dir = path.dirname(filePath);
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true });
}

class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}

const adapter = new JSONFile<Data>(filePath);

export const db = new LowWithLodash<Data>(adapter, defaultData);

