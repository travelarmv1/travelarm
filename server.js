
const express = require('express');
const path = require('path');

const app = express();
const HOST = '0.0.0.0';
const PORT = 3000;

// Serve index.html at root
app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
