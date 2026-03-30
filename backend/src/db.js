const mongoose = require('mongoose');

const connectDB = async (retries = 5, delay = 3000) => {
    for (let i = 1; i <= retries; i++) {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 5000,
            });
            console.log(`[DB] Connected to MongoDB at ${conn.connection.host}`);
            return;
        } catch (err) {
            console.error(`[DB] Connection attempt ${i}/${retries} failed:`, err.message);
            if (i === retries) {
                console.error('[DB] All retries exhausted, exiting.');
                process.exit(1);
            }
            await new Promise(res => setTimeout(res, delay));
        }
    }
};

module.exports = connectDB;
