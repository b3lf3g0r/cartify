/**
 * @fileoverview
 * @author moobi-kabelo
 * @version 1.0.0-alpha.1
 * @since 2023-06-27
 */

/**
 * Base class for custom API errors.
 */
export class CustomAPIError extends Error {
 /**
  * HTTP status code of the error.
  */
 statusCode: number;

 /**
  * Error object containing detailed information.
  */
 error: {
  message: string;
  source: {
   module: string;
   method: string;
   trace: Record<string, any>;
  };
  type: string;
 };

 /**
  * Constructs a new CustomAPIError instance.
  * @param {number} statusCode - The HTTP status code of the error.
  * @param {object} error - The error object containing detailed information.
  */
 constructor(
  statusCode: number,
  error: {
   message: string;
   source: {
    module: string;
    method: string;
    trace: Record<string, any>;
   };
   type: string;
  }
 ) {
  super(error.message);
  this.statusCode = statusCode;
  this.error = {
   message: error.message,
   source: {
    module: error.source.module,
    method: error.source.method,
    trace: { ...error.source.trace },
   },
   type: error.type,
  };
 }
}

/**
 * Represents a Bad Request error (HTTP 400).
 */
export class BadRequestError extends CustomAPIError {
 /**
  * Constructs a new BadRequestError instance.
  * @param {object} error - The error object containing detailed information.
  */
 constructor(error: {
  message: string;
  source: {
   module: string;
   method: string;
   trace: Record<string, any>;
  };
  type: string;
 }) {
  super(400, error);
 }
}

/**
 * Represents an Unauthorized error (HTTP 401).
 */
export class UnauthorizedError extends CustomAPIError {
 /**
  * Constructs a new UnauthorizedError instance.
  * @param {object} error - The error object containing detailed information.
  */
 constructor(error: {
  message: string;
  data?: Record<string, any>;
  source: {
   module: string;
   method: string;
   trace: Record<string, any>;
  };
  type: string;
 }) {
  super(401, error);
 }
}

/**
 * Represents a Validation error (HTTP 422).
 */
export class ValidationError extends CustomAPIError {
 /**
  * Constructs a new ValidationError instance.
  * @param {object} error - The error object containing detailed information.
  */
 constructor(error: {
  message: string;
  source: {
   module: string;
   method: string;
   trace: Record<string, any>;
  };
  type: string;
 }) {
  super(422, error);
 }
}

/**
 * Represents a Too Many Requests error (HTTP 429).
 */
export class TooManyRequestsError extends CustomAPIError {
 /**
  * Constructs a new TooManyRequestsError instance.
  * @param {object} error - The error object containing detailed information.
  */
 constructor(error: {
  message: string;
  source: {
   module: string;
   method: string;
   trace: Record<string, any>;
  };
  type: string;
 }) {
  super(429, error);
 }
}

/**
 * Represents a Request Failed error (HTTP 402).
 */
export class RequestFailedError extends CustomAPIError {
 /**
  * Constructs a new RequestFailedError instance.
  * @param {object} error - The error object containing detailed information.
  */
 constructor(error: {
  message: string;
  source: {
   module: string;
   method: string;
   trace: Record<string, any>;
  };
  type: string;
 }) {
  super(402, error);
 }
}

/**
 * Represents a Not Found error (HTTP 404).
 */
export class NotFoundError extends CustomAPIError {
 /**
  * Constructs a new NotFoundError instance.
  * @param {object} error - The error object containing detailed information.
  */
 constructor(error: {
  message: string;
  source: {
   module: string;
   method: string;
   trace: Record<string, any>;
  };
  type: string;
 }) {
  super(404, error);
 }
}

/**
 * Represents an Internal Server error (HTTP 500).
 */
export class InternalServerError extends CustomAPIError {
 /**
  * Constructs a new InternalServerError instance.
  * @param {object} error - The error object containing detailed information.
  */
 constructor(error: {
  message: string;
  source: {
   module: string;
   method: string;
   trace: Record<string, any>;
  };
  type: string;
 }) {
  super(500, error);
 }
}
