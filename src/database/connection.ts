import mongoose from 'mongoose';

const connectDB = async (urlDB: string) =>
  new Promise((resolve, reject) => {
    mongoose.connect(urlDB, error => {
      if (error) {
        reject(error);
      }

      resolve(true);
    });
  });

export default connectDB;
