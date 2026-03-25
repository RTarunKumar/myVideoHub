import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI as string)
        console.log('DB is Connected')
    } catch (err) {
        console.log(err)
    }
}

export default connectDB