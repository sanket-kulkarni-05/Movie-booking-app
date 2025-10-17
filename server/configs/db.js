import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log('Attempting to connect to database...');
        
        // Connect to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URI}/quickshow`);
        
        // Test the connection
        console.log('Database connected successfully!');
        console.log('Connected to:', mongoose.connection.name);
        
    } catch (error) {
        console.log('Database connection error:', error.message);
    }
}

export default connectDB;