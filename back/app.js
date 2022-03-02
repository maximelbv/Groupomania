import express from 'express';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import path from 'path';
import multer from 'multer';

const app = express();
const upload = multer(); // maybe more config needed
// expressApp.use(helmet());
// expressApp.use(methodOverride());

app.use(express.urlencoded({extended: true}));

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// body parser
app.use(express.json());


app.use('/images', express.static(path.join('images')));

app.use('/api/auth', authRoutes);

app.use('/api/post', postRoutes);

app.use('/api/comment', commentRoutes);


export default app;