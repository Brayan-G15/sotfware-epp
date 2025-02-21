import dotenv from 'dotenv';
dotenv.config(); // Carga las variables de entorno desde el archivo .env
import mongoose from 'mongoose';
import Usuario from './models/Usuario.js'; // Asegúrate de importar tu modelo de usuario

// Conectar a la base de datos
const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1);
    }
};

// Consultar usuarios
const consultarUsuarios = async () => {
    try {
        const usuarios = await Usuario.find({});
        console.log('Usuarios encontrados:', usuarios);
    } catch (error) {
        console.error('Error consultando usuarios:', error);
    }
};

// Ejecutar el script
(async () => {
    await conectarDB();
    await consultarUsuarios();
    process.exit(0);
})();