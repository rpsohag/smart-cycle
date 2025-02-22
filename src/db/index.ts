import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new DatabaseError('MONGODB_URI is not defined in the environment variables.');
    }

    await mongoose.connect(uri);

    console.log('MongoDB Database Connection Is Working!...');
    if (mongoose.connection.db) {
      console.log(`Database Name: ${mongoose.connection.db.databaseName}`);
      console.log(`Database Port: ${mongoose.connection.port}`);
    }

    mongoose.connection.on('error', (error) => {
      console.error('MongoDB Connection Error:', error.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB Connection Is Disconnected!..');
    });
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error('Database Error:', error.message);
    } else if (error instanceof Error) {
      console.error('Error connecting to MongoDB:', error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
  }
};

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB Connection Closed Due to Application Termination.');
  process.exit(0);
});

export default connectToDatabase;