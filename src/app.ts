/**
 * @fileoverview
 * @author moobi-kabelo
 * @version 1.0.0-alpha.1
 * @since 2023-06-24
 */

import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import * as swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

import { ProductRoutes } from './routes/routes';

const require = createRequire(import.meta.url);
const swaggerDoc: any = require('../swagger.json');

dotenv.config();

const app: express.Application = express();

// Middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(compression()); // compress all responses
app.use(
 cors({
  origin: ['*'],
  credentials: true,
 })
);
app.use(express.json());
// Security Headers
app.use(helmet());

app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/v1/product', new ProductRoutes().getRouter());

export { app };
