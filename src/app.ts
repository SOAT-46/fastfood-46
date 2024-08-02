import dotenv from 'dotenv';
import {buildServer, runGenerate} from './server';

const main = async () => {
    dotenv.config();

    const port = Number(process.env.APP_PORT);
    const host = process.env.APP_HOST;

    const server = await buildServer();
    server.listen({port, host}, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
    server.swagger();
    runGenerate();
  });
}

main();
