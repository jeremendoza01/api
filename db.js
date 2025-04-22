const mongoose = require('mongoose');

// url de conexión a MongoDB
const MONGO_URI = 'mongodb://localhost:27017/Api';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Conexión exitosa a MongoDB.");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
};

module.exports = connectDB;
