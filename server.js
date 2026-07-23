import express from 'express';
import productRouter from './Routes/product.js'
import { connectDB } from './Config/db.js';
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

process.loadEnvFile();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use('/api', productRouter);

connectDB();

app.listen(port, () => {
    console.log('Server running on port ${port} 6810210533');
});

app.use((err, req, res, next) => {
 console.error(err)
 res.status(500).json({ message: 'Server Error' })
})