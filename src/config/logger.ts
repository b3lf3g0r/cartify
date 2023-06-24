/**
 * @fileoverview
 * @author moobi-kabelo
 * @version 1.0.0-alpha.1
 * @since 2023-06-24
 */

import dotenv from 'dotenv';
import winston from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

dotenv.config();

const {
 LOGTAIL_AUDIT_ACCESS_TOKEN,
 LOGTAIL_ACTIVITY_ACCESS_TOKEN,
 LOGTAIL_ERROR_ACCESS_TOKEN,
} = process.env;

/**
 * Transports interface for the logger.
 */
interface Transports {
 [key: string]: {
  audit: winston.transport;
  activity: winston.transport;
  error: winston.transport;
 };
}

/**
 * Logger configuration interface.
 */
interface LoggerConfig {
 transports: Transports;
}

/**
 * Configuration object for the logger.
 */
export const loggerConfig: LoggerConfig = {
 transports: {
  development: {
   audit: new winston.transports.Console({
    level: 'info',
    format: winston.format.combine(
     winston.format.json(),
     winston.format.prettyPrint()
    ),
   }),
   activity: new winston.transports.Console({
    level: 'info',
    format: winston.format.combine(
     winston.format.json(),
     winston.format.prettyPrint()
    ),
   }),
   error: new winston.transports.Console({
    level: 'info',
    format: winston.format.combine(
     winston.format.json(),
     winston.format.prettyPrint()
    ),
   }),
  },

  production: {
   audit: new LogtailTransport(new Logtail(LOGTAIL_AUDIT_ACCESS_TOKEN ?? '')),
   activity: new LogtailTransport(
    new Logtail(LOGTAIL_ACTIVITY_ACCESS_TOKEN ?? '')
   ),
   error: new LogtailTransport(new Logtail(LOGTAIL_ERROR_ACCESS_TOKEN ?? '')),
  },
 },
};
