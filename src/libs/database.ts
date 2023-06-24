/**
 * @fileoverview
 * @author moobi-kabelo
 * @version 1.0.0-alpha.1
 * @since 2023-06-24
 */

import mongoose from 'mongoose';
import { Redis } from 'ioredis';
import { databaseConfig } from '../config/index';

/**
 * Database class to handle MongoDB and Redis connections.
 */
export class Database {
 /**
  * Method to connect to MongoDB.
  * @returns {Promise<typeof import("mongoose")>} A promise that resolves with the Mongoose connection object when the connection is successful.
  * @static
  */
 static mongoConnect(): Promise<typeof import('mongoose')> {
  return mongoose.connect(
   process.env.NODE_ENV !== 'production'
    ? databaseConfig.production.mongo.url
    : databaseConfig.development.mongo.url
  );
 }

 /**
  * Method to close the MongoDB connection.
  * @returns {Promise<void>}
  * @static
  */
 static mongoClose(): Promise<void> {
  return mongoose.connection.close();
 }

 /**
  * Method to connect to Redis.
  * @returns {Redis} The Redis client.
  * @static
  */
 static redisConnect(): Redis {
  return new Redis(
   process.env.NODE_ENV !== 'production'
    ? {
       ...databaseConfig.production.redis,
       db: parseInt(databaseConfig.production.redis.db),
      }
    : {
       ...databaseConfig.development.redis,
       db: parseInt(databaseConfig.development.redis.db),
      }
  );
 }
}
