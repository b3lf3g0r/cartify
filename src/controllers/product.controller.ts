/**
 * @fileoverview
 * @author moobi-kabelo
 * @version 1.0.0-alpha.1
 * @since 2023-06-27
 */
import { Request, Response } from 'express';
import { activityLogger } from '../libs';
import { ProductService } from '../services/product.service';

export class ProductController {
 private productService: ProductService;

 constructor() {
  this.productService = new ProductService();
 }

 AddProduct = (req: Request, res: Response): void => {
  const {
   name,
   brand,
   desc,
   images,
   colors,
   sizes,
   price,
   quantity,
   sku,
   categories,
  }: {
   name: string;
   brand: string;
   desc: string;
   images: Array;
   colors: Array;
   sizes: Array;
   price: object;
   quantity: number;
   sku: string;
   categories: Array;
  } = req.body;

  if (
   !name ||
   !brand ||
   !desc ||
   !images ||
   !colors ||
   !sizes ||
   !price ||
   !quantity ||
   !sku ||
   !categories
  ) {
   res.status(400).json({
    statusCode: 400,
    error: {
     message: 'Sorry, all fields are required.',
     type: 'product_error',
    },
   });
   return;
  }

  this.productService
   .AddProduct({
    name,
    brand,
    desc,
    images,
    colors,
    sizes,
    price,
    quantity,
    sku,
    categories,
   })
   .then((response) => {
    activityLogger.info('Product save successfully.', {
     productId: response.data.product._id,
     event: 'product_save',
     timestamp: new Date(),
     userAgent: req.headers['user-agent'],
    });

    return res.status(response.statusCode).json({
     ...response,
    });
   })
   .catch((error) => {
    activityLogger.error('Product save failed.', {
     event: 'product_save',
     timestamp: new Date(),
     userAgent: req.headers['user-agent'],
     info: { ...error },
    });

    return res.status(error.statusCode).json({
     ...error,
    });
   });
 };

 ListProduct = (req: Request, res: Response): void => {
  const id: string = req.params.id;

  if (!id) {
   res.status(400).json({
    statusCode: 400,
    error: {
     message: 'Sorry, product id is required.',
     type: 'product_error',
    },
   });
   return;
  }

  this.productService
   .List(id)
   .then((response) => {
    return res.status(response.statusCode).json({
     ...response,
    });
   })
   .catch((error) => {
    activityLogger.warn('Products list.', {
     productId: id,
     event: 'product_list',
     timestamp: new Date(),
     userAgent: req.headers['user-agent'],
     info: { ...error },
    });

    return res.status(error.statusCode).json({
     ...error,
    });
   });
 };

 FilterProducts = (req: Request, res: Response): void => {
  const query: object = req.query;

  this.productService
   .Filter(query)
   .then((response) => {
    return res.status(response.statusCode).json({
     ...response,
    });
   })
   .catch((error) => {
    activityLogger.warn('Products filter failed.', {
     event: 'product_filter',
     timestamp: new Date(),
     userAgent: req.headers['user-agent'],
     info: { ...error },
    });

    return res.status(error.statusCode).json({
     ...error,
    });
   });
 };

 UpdateProduct = (req: Request, res: Response): void => {
  const id: string = req.params.id;
  const data: object = req.body;

  if (!id) {
   res.status(400).json({
    statusCode: 400,
    error: {
     message: 'Sorry, product id is required.',
     type: 'product_error',
    },
   });
   return;
  }

  if (Object.keys(data).length === 0) {
   res.status(400).json({
    error: {
     message: 'Sorry, nothing to update.',
     type: 'product_error',
    },
   });
   return;
  }

  this.productService
   .Update(id, data)
   .then((response) => {
    activityLogger.info('Product update successful.', {
     productId: id,
     event: 'product_update',
     timestamp: new Date(),
     userAgent: req.headers['user-agent'],
    });

    return res.status(response.statusCode).json({
     ...response,
    });
   })
   .catch((error) => {
    activityLogger.error('Product update failed.', {
     productId: id,
     event: 'product_update',
     timestamp: new Date(),
     userAgent: req.headers['user-agent'],
     info: { ...error },
    });

    return res.status(error.statusCode).json({
     ...error,
    });
   });
 };

 DeleteProduct = (req: Request, res: Response): void => {
  const id: string = req.params.id;

  if (!id) {
   res.status(400).json({
    statusCode: 400,
    error: {
     message: 'Sorry, product id is required.',
     type: 'product_error',
    },
   });
   return;
  }

  this.productService
   .Delete(id)
   .then((response) => {
    activityLogger.info('Product successfully deleted.', {
     productId: id,
     event: 'product_delete',
     timestamp: new Date(),
     userAgent: req.headers['user-agent'],
    });

    return res.status(response.statusCode).json({
     ...response,
    });
   })
   .catch((error) => {
    activityLogger.error('Product delete failed.', {
     productId: id,
     event: 'product_delete',
     timestamp: new Date(),
     userAgent: req.headers['user-agent'],
     info: { ...error },
    });
    return res.status(error.statusCode).json({
     ...error,
    });
   });
 };
}
