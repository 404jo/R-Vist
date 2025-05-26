const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const visitas = [];

app.get('/track', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const timestamp = new Date().toISOString();
  visitas.push({ ip, timestamp });
  console.log(`Nueva visita de: ${ip} a las ${timestamp}`);
  res.send('IP registrada');
});

app.get('/stats', (req, res) => {
  res.json({
    total: visitas.length,
    detalles: visitas,
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
