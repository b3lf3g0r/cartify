/**
 * @fileoverview
 * @author moobi-kabelo
 * @version 1.0.0-alpha.1
 * @since 2023-06-24
 */

import winston from 'winston';
import { loggerConfig } from '../config/index';

const environment: string | undefined = process.env.NODE_ENV;

if (!environment) {
 throw new Error(`Invalid configuration for environment: ${environment}`);
}

const { transports } = loggerConfig;
const auditLogger: winston.Logger = winston.createLogger({
 transports: [transports[environment].audit],
});
const activityLogger: winston.Logger = winston.createLogger({
 transports: [transports[environment].activity],
});
const errorLogger: winston.Logger = winston.createLogger({
 transports: [transports[environment].error],
});

export { auditLogger, activityLogger, errorLogger };
