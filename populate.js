import {readFile} from 'fs/promises';
import Job from './models/Job.js';
import connectDB from './db/connect.js';
import dotenv from 'dotenv';

(async () => {
    dotenv.config();
    try {
        await connectDB(process.env.MONGO_URL);
        let jobs = JSON.parse(await readFile(new URL('./MOCK_DATA.json', import.meta.url)));
        await Job.create(jobs);
        console.log('success');
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }

    
})();