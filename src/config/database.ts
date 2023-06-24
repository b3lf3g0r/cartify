/**
 * @fileoverview
 * @author moobi-kabelo
 * @version 1.0.0-alpha.1
 * @since 2023-06-24
 */

import dotenv from 'dotenv';

dotenv.config();

/**
 * Configuration interface for the database.
 */
interface DatabaseConfig {
 /**
  * Production environment configuration.
  */
 production: {
  mongo: { url: string };
  redis: {
   port: string;
   host: string;
   db: string;
  };
 };
 /**
  * Development environment configuration.
  */
 development: {
  mongo: { url: string };
  redis: {
   port: string;
   host: string;
   db: string;
  };
 };
}

/**
 * Configuration object for the database.
 */
export const databaseConfig: DatabaseConfig = {
 production: {
  mongo: { url: process.env.MONGO_PROD_URL ?? '' },
  redis: {
   port: process.env.REDIS_DEV_PORT ?? '',
   host: process.env.REDIS_DEV_HOST ?? '',
   db: process.env.REDIS_DEV_DB ?? '',
  },
 },
 development: {
  mongo: { url: process.env.MONGO_DEV_URL ?? '' },
  redis: {
   port: process.env.REDIS_DEV_PORT ?? '',
   host: process.env.REDIS_DEV_HOST ?? '',
   db: process.env.REDIS_DEV_DB ?? '',
  },
 },
};
