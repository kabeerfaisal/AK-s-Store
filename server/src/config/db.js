import mongoose from "mongoose";



const ConnectDB = async () => {
    try {
        const ConnectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${ConnectionInstance.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
    }
}

export default ConnectDB