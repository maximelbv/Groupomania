import http from 'http';
import app from './app.js';
import 'dotenv/config';

app.set('port', 8080);
const server = http.createServer(app);

server.listen(process.env.PORT,() => {
    console.log(`Listening on port ${process.env.PORT}`)
} );