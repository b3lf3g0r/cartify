/**
 * @fileoverview
 * @author moobi-kabelo
 * @version 1.0.0-alpha.1
 * @since 2023-06-27
 */

import Product from '../schemas/product.schema';

export class ProductHelper {
 private product: typeof Product;

 constructor() {
  this.product = Product;
 }

 /**
  * Save new product docuent to the database
  * @param {Object} productData - product data
  * @returns {Promise} - A promise that resolves of rejects with an error
  */
 public save = (productData: object): Promise<object> =>
  new Product(productData).save();

 /**
  * Retrieve product docuent from the database
  * @param {String} id - id of the product
  * @returns {Promise} - A promise that resolves of rejects with an error
  */
 public retrieve = (id: string): Promise<any> =>
  Product.findOne({
   _id: {
    $eq: id,
   },
  });

 /**
  * Fetcht products docuent from the database
  * @param {Object} query - query to fetch roducts with
  * @returns {Promise} - A promise that resolves of rejects with an error
  */
 public filter = (query: {
  new?: boolean;
  brand?: string;
  category?: string;
  limit?: number;
 }): Promise<any> => {
  if (query.new) {
   Product.find()
    .sort({ createdAt: -1 })
    .limit(query.limit ? query.limit : 20);
  } else if (query.brand) {
   Product.find({
    brand: {
     $eq: query.brand,
    },
   }).limit(query.limit ? query.limit : 20);
  } else if (query.category) {
   Product.find({
    categores: {
     $in: [query.category],
    },
   }).limit(query.limit ? query.limit : 20);
  } else {
   Product.find().limit(query.limit ? query.limit : 20);
  }
 };

 /**
  * Update product docuent from the database
  * @param {String} id - id of the product
  * @param {Object} data - prouct data to update
  * @returns {Promise} - A promise that resolves of rejects with an error
  */
 public update = (
  id: string,
  data: {
   name?: string;
   brand?: string;
   desc?: string;
   images?: Array;
   colors?: Array;
   sizes?: Array;
   price?: object;
   quantity?: number;
   sku?: string;
   categories?: Array;
  }
 ): Promise<any> =>
  Product.findOneAndUpdate(
   {
    _id: {
     $eq: id,
    },
   },
   {
    $set: {
     name: data.name,
     brand: data.brand,
     desc: data.desc,
     images: data.images,
     colors: data.colors,
     sizes: data.sizes,
     priced: data.price,
     quantity: data.quantity,
     sku: data.sku,
     categories: data.categories,
    },
   },
   {
    new: true,
   }
  );

 /**
  * Delete product docuent from the database
  * @param {String} id - id of the product
  * @returns {Promise} - A promise that resolves of rejects with an error
  */
 public delete = (id: string): Promise<any> =>
  Product.findOneAndDelete({
   _id: {
    $eq: id,
   },
  });
}
