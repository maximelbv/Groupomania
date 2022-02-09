import express from 'express';
import authRoutes from './routes/auth.js';
import db from './db.js';

// express app creation
const app = express();


// Connect to mysql
db.connect(err => {
    let message = !err ? 'connected' : 'connection failed';
    console.log(`mySQL : ${message}`);
})

// CORS middleware (Cross-origin resource sharing) - allow  front & back ports compatibility
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// used to recognize incoming request objects as JSON objects
app.use(express.json());

app.use('/api/auth', authRoutes);


export default app;