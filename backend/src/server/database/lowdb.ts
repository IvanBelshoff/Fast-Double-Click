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

// Define o caminho absoluto para o arquivo registros.json
const filePath = path.resolve(__dirname, 'registros.json');

// Verifica se o diretório existe; se não, cria
const dir = path.dirname(filePath);
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true });
}

// Classe que estende Low e adiciona a funcionalidade do Lodash
class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}

const adapter = new JSONFile<Data>(filePath);

// Inicializa o banco de dados com a classe estendida
export const db = new LowWithLodash<Data>(adapter, defaultData);

