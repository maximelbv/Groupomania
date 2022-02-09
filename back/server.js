import http from 'http';
import app from './app.js';

app.set('port', 8080);
const server = http.createServer(app);

server.listen(8080,() => {
    console.log(`Listening on port 8080`)
} );