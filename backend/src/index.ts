// index.ts
import { db } from './server/database/lowdb';
import { server } from './server/Server';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

(async () => {
  try {
    
    const dbLow = db;

    await dbLow.read();

    console.log('\nBanco de dados Lowdb conectado\n');

    server.listen(PORT, async () => {
      console.log(`Servidor rodando no endereço: http://${HOST}:${PORT}\n`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
})();
