import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

// Configurar dotenv
dotenv.config();

// Conectar a la base de datos
conectarDB();

// Crear el servidor
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para leer datos en formato JSON

// Rutas
app.use('/api/usuarios', usuarioRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});