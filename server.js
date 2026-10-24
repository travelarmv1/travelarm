
const express = require('express');
const path = require('path');

const app = express();
const HOST = '0.0.0.0';
const PORT = 3000;
const APK_URL = 'https://github.com/s76715939-glitch/Travelarm/releases/latest/download/travelarm-release.apk';
// Serve index.html at root
app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/download', async (req, res) => {
  try {
    const response = await fetch(APK_URL);

    if (!response.ok || !response.body) {
      return res.status(502).send('APK download failed');
    }

    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="Travelarm.apk"'
    );
    res.setHeader('Cache-Control', 'no-store');

    const { Readable } = require('node:stream');
    Readable.fromWeb(response.body).pipe(res);
  } catch (error) {
    console.error('Download error:', error.message);

    if (!res.headersSent) {
      res.status(502).send('Unable to download APK');
    } else {
      res.destroy(error);
    }
  }
});


// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
