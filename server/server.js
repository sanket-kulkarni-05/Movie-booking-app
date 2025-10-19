import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
const port = process.env.PORT || 3000;

await connectDB()

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())


// API routes
app.get('/', (req, res) => {
    res.send("Server is live and running!");
});

app.use('/api/ingest', serve({client: inngest, functions }))

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});