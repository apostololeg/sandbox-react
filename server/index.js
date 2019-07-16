import express from 'express'
import cookieParser from 'cookie-parser'
import historyApiFallback from 'connect-history-api-fallback'
import cors from 'cors'

import paths from '../config/paths'
import { NODE_ENV } from '../config/const'

import apollo from './apollo'
import uploads from './uploads'

const isProd = NODE_ENV === 'production';
const port = isProd ? 80 : 3000;
const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(historyApiFallback());

apollo(app);
uploads(app);

if (isProd) {
  app.use(express.static(paths.build));
}

app.listen({ port }, () => {
  console.log(`\n  🚀  App ready on port ${port}\n`); // eslint-disable-line
});
