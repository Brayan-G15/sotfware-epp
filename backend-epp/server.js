import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3010;

// Middleware
app.use(bodyParser.json());
app.use(express.static('../frontend-epp/public'));

// Crear la carpeta "signatures" si no existe
const signaturesDir = path.join(__dirname, 'signatures');
if (!fs.existsSync(signaturesDir)) {
    fs.mkdirSync(signaturesDir);
}

// Ruta para guardar la firma
app.post('/save-signature', (req, res) => {
    const { image } = req.body;

    // Eliminar el prefijo "data:image/png;base64,"
    const base64Data = image.replace(/^data:image\/png;base64,/, '');

    // Guardar la imagen en la carpeta "signatures"
    const filePath = path.join(signaturesDir, `signature_${Date.now()}.png`);
    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error('Error al guardar la firma:', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});