import dotenv from 'dotenv';
import {buildServer} from './server';

const main = async () => {
    dotenv.config();

    const port = Number(process.env.APP_PORT) || 3000;
    const host = process.env.APP_HOST || 'localhost';

    const server = await buildServer();
    server.listen({port, host}, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
    server.swagger();
  });
}

main();
