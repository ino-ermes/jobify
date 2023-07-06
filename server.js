import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
app.use(express.json());

// logger
import morgan from 'morgan';

// allow throw error to middleware
import 'express-async-errors';

// db
import connectDB from './db/connect.js';

// middleware
import notFoundMiddleWare from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

// router
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

if(process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.get('/', (req, res) => {
    res.send({msg: '君のせいだよって'});
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);


app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        const port = process.env.PORT || 5000;
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log('忘れてやらない！');
        });
    } catch(error) {
        
        console.log('ばかやろう！');
        console.log(error);
    }
};

start();