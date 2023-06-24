/**
 * @fileoverview
 * @author moobi-kabelo
 * @version 1.0.0-alpha.1
 * @since 2023-06-24
 */

import dotenv from 'dotenv';
import http from 'http';
import ip from 'ip';
import path from 'path';
import os from 'os';

import { app } from './app';
import { Database, activityLogger, errorLogger } from './libs/index';

dotenv.config();

/**
 * The port on which the server will listen.
 * @type {number}
 */
const PORT: number = parseInt(process.env.PORT as string, 10) || 5500;

/**
 * Create an HTTP server instance using the Express app.
 */
const server: http.Server = http.createServer(app);

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
