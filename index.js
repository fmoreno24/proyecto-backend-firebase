const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = 3000;

// Inicializa Firebase Admin
const serviceAccount = require('./firebase-config.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // conexión a Firestore

// Middleware para JSON
app.use(express.json());

// Ruta de prueba: agregar un documento
app.post('/usuarios', async (req, res) => {
    try {
      const data = req.body;
      const docRef = await db.collection('usuarios').add(data);
      res.status(201).send({ id: docRef.id });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // Ruta de prueba: obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
    try {
      const snapshot = await db.collection('usuarios').get();
      const usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.send(usuarios);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

app.get('/', (req, res) => {
  res.send('¡Hola desde Express 2!');
});

app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
  });


/* app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
}); */
