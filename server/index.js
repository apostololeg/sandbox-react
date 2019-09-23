import fs from 'fs'
import http from 'http'
import https from 'https'
import express from 'express'
import cookieParser from 'cookie-parser'
import historyApiFallback from 'connect-history-api-fallback'
import cors from 'cors'
import compression from 'compression'
import expressStaticGzip from 'express-static-gzip'

import paths from '../config/paths'
import { PRODUCTION, PORT, PEM_DIR } from '../config/const'

import uploads from './tools/uploads'
import apollo from './apollo'

const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

const app = express();

if (!PRODUCTION) {
  app.use(cors({
    origin: true,
    credentials: true,
  }));
}

app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

app.use(compression());
app.use(cookieParser());
app.use(historyApiFallback());

apollo(app);
uploads(app);

if (PRODUCTION) {
  app.use(express.static(paths.build));
  app.use(paths.build, expressStaticGzip(paths.build, {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    setHeaders: res => {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
  }));

  const httpServer = http.createServer(app);
  const httpsServer = https.createSecureServer({
    allowHTTP1: true,
    key: fs.readFileSync(`${PEM_DIR}privkey.pem`, 'utf8'),
    cert: fs.readFileSync(`${PEM_DIR}cert.pem`, 'utf8'),
    ca: fs.readFileSync(`${PEM_DIR}chain.pem`, 'utf8')
  }, app);

  console.log('\n');
  httpServer.listen(80, () => console.log('HTTP 🚀 on port 80'));
  httpsServer.listen(443, () => console.log('HTTPS 🔐 on port 443'));
} else {
  const port = PORT.replace(/^:/, '');

  app.listen({ port }, () => {
    console.log(`\n  🚀  App ready on port ${port}\n`);
  });
}
