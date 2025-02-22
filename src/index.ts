import express from 'express';
import * as dotenv from 'dotenv';
import { connectDB } from './db';

dotenv.config();
const app = express();
const port = process.env.APP_PORT || 5050;

app.get('/', (req, res) => {
    res.send('Smart Cycle');
});

app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port ${port}`);
});