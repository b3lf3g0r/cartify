/**
 * @fileoverview
 * @author moobi-kabelo
 * @version 1.0.0-alpha.1
 * @since 2023-06-27
 */

import { NextFunction, Request, Response, Router } from 'express';

import { ProductController } from '../controllers/product.controller';

export class ProductRoutes {
 private router: Router;
 private productController: ProductController;

 constructor() {
  this.router = Router();
  this.productController = new ProductController();
  this.init();
 }

 public getRouter = (): Router => {
  return this.router;
 };

 private init = (): void => {
  this.router
   .post('/', this.AddProduct.bind(this))
   .get('/:id', this.ListProduct.bind(this))
   .get('', this.FilterProducts.bind(this))
   .put('/:id', this.UpdateProduct.bind(this))
   .delete('/:id', this.DeleteProduct.bind(this));
 };

 private AddProduct = (
  req: Request,
  res: Response,
  next: NextFunction
 ): void => {
  this.productController.AddProduct(req, res, next);
 };

 private ListProduct = (
  req: Request,
  res: Response,
  next: NextFunction
 ): void => {
  this.productController.ListProduct(req, res, next);
 };

 private FilterProducts = (
  req: Request,
  res: Response,
  next: NextFunction
 ): void => {
  this.productController.FilterProducts(req, res, next);
 };

 private UpdateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
 ): void => {
  this.productController.UpdateProduct(req, res, next);
 };

 private DeleteProduct = (
  req: Request,
  res: Response,
  next: NextFunction
 ): void => {
  this.productController.DeleteProduct(req, res, next);
 };
}
