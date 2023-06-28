/**
 * @fileoverview
 * @author moobi-kabelo
 * @version 1.0.0-alpha.1
 * @since 2023-06-27
 */

import mongoose from 'mongoose';

/**
 * Represents a Product.
 *
 * @typedef {object} Product
 * @property {string} name - The name of the product.
 * @property {string} brand - The brand of the product.
 * @property {string} desc - The description of the product.
 * @property {Array} images - The images of the product.
 * @property {Array} colors - The available colors of the product.
 * @property {Array} sizes - The available sizes of the product.
 * @property {object} price - The price of the product.
 * @property {number} quantity - The quantity of the product.
 * @property {string} sku - The SKU (Stock Keeping Unit) of the product.
 * @property {Array} categories - The categories of the product.
 * @property {Date} createdAt - The timestamp when the product was created.
 * @property {Date} updatedAt - The timestamp when the product was last updated.
 */

const Product = new mongoose.Schema(
 {
  /**
   * The name of the product.
   *
   * @type {string}
   */
  name: {
   type: String,
   required: true,
  },
  /**
   * The brand of the product.
   *
   * @type {string}
   */
  brand: {
   type: String,
   required: true,
  },
  /**
   * The description of the product.
   *
   * @type {string}
   */
  desc: {
   type: String,
   required: true,
  },
  /**
   * The images of the product.
   *
   * @type {Array}
   */
  images: {
   type: Array,
   required: true,
  },
  /**
   * The available colors of the product.
   *
   * @type {Array}
   */
  colors: {
   type: Array,
   required: true,
  },
  /**
   * The available sizes of the product.
   *
   * @type {Array}
   */
  sizes: {
   type: Array,
   required: true,
  },
  /**
   * The price of the product.
   *
   * @type {object}
   */
  price: {
   type: Object,
   required: true,
  },
  /**
   * The quantity of the product.
   *
   * @type {number}
   */
  quantity: {
   type: Number,
   required: true,
  },
  /**
   * The SKU (Stock Keeping Unit) of the product.
   *
   * @type {string}
   */
  sku: {
   type: String,
   required: true,
  },
  /**
   * The categories of the product.
   *
   * @type {string}
   */
  categories: {
   type: Array,
   required: true,
  },
 },
 { timestamps: true }
);

export default mongoose.model('Product', Product);
