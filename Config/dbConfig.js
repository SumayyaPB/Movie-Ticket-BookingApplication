import mongoose from 'mongoose';
import 'dotenv/config'

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connected to DB');
    } catch (error) {
        console.log(error);
    }
}
 export default connectDB

