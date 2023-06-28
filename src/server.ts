/**
 * @fileoverview
 * @author moobi-kabelo
 * @version 1.0.0-alpha.1
 * @since 2023-06-24
 */

import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
import ip from 'ip';
import path from 'path';
import os from 'os';
import url from 'url';

import { app } from './app';
import { Database, activityLogger, errorLogger } from './libs/index';

dotenv.config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * The port on which the server will listen.
 * @type {number}
 */
const PORT: number = parseInt(process.env.PORT as string, 10) || 5500;

/**
 * Create an HTTP server instance using the Express app.
 */
const server: https.Server = https.createServer(
 {
  key: fs.readFileSync(path.join(__dirname, './config/oxide-commerce.key')),
  cert: fs.readFileSync(path.join(__dirname, './config/oxide-commerce.crt')),
 },
 app
);
//const server: http.Server = http.createServer(app);

/**
 * Connect to the database and start the server.
 */
Database.mongoConnect()
 .then(() => {
  server.listen(PORT, () => {
   activityLogger.info(`${process.env.APP_NAME} Server Started.`, {
    server: {
     name: os.hostname(),
     ip: ip.address(),
     port: PORT,
     protocol: 'https',
     platform: os.platform(),
     path: path.resolve('.'),
    },
   });
  });
 })
 .catch((error: any) => {
  errorLogger.error('Failed To Establish Connection To Database.', {
   database: {
    name: 'MongoDB',
    error,
   },
  });
  server.close(); // Exit the application on database connection failure
 });
