import dotenv from 'dotenv';
import Fastify from 'fastify';

dotenv.config();

const server = Fastify({logger: true});

const port = Number(process.env.APP_PORT) || 3000;
const host = process.env.APP_HOST || 'localhost';
server.listen({port, host}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
