import express from 'express';
import * as dotenv from 'dotenv';
import connectToDatabase from './db';

dotenv.config();
const app = express();
const port = process.env.APP_PORT || 5050;

app.get('/', (req, res) => {
    res.send('Smart Cycle');
});

app.listen(port, () => {
    connectToDatabase();
    console.log(`Example app listening on port ${port}`);
});