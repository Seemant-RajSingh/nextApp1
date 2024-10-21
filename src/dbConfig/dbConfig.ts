// can name this file anything without issues

import mongoose from 'mongoose';

export async function connect() {
    try {
        //console.log(process.env.MONGO_URL)
        mongoose.connect(process.env.MONGO_URL!);
        // without ! in MONGO_URL! typescript would cause error saying this value might not be always availaible, but using ! means programmer is sure value will be given.
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully!")
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error, make sure MongoDB is running ' + err)
        })
    }
    catch (error) {
        console.log("Something went wrong!");
        console.log(error);
    }
}