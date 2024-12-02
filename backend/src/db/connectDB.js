const mongoose = require('mongoose');

export const ConnectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.mongoURI);
        console.log(
            `DB CONNECTED !!, host: ${connectionInstance.connection.host}`
        );
    } catch (err) {
        console.log('DB CONNECTION FAILED !!', err);
    }
};
