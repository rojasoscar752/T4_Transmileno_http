const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const busRoutes = require('./routes/busRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
mongoose.connect('mongodb://localhost/transmilenio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rutas
app.use('/api/buses', busRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
