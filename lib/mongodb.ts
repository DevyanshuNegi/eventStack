// import { MongoClient } from 'mongodb'

// if (!process.env.MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
// }

// const uri = process.env.MONGODB_URI
// const options = {}



// // let client
// // let clientPromise: Promise<MongoClient>

// // if (process.env.NODE_ENV === 'development') {
// //   // In development mode, use a global variable so that the value
// //   // is preserved across module reloads caused by HMR (Hot Module Replacement).
// //   if (!global._mongoClientPromise) {
// //     client = new MongoClient(uri, options)
// //     global._mongoClientPromise = client.connect()
// //   }
// //   clientPromise = global._mongoClientPromise
// // } else {
// //   // In production mode, it's best to not use a global variable.
// //   client = new MongoClient(uri, options)
// //   clientPromise = client.connect()
// // }

// // export default clientPromise

import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    // Attempt to connect to the database
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

    connection.isConnected = db.connections[0].readyState;

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
}

export default dbConnect;
