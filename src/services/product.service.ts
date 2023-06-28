/**
 * @fileoverview
 * @author moobi-kabelo
 * @version 1.0.0-alpha.1
 * @since 2023-06-27
 */
import { ProductHelper } from '../helpers';
import { NotFoundError, InternalServerError } from '../errors/errors';

export class ProductService {
 private productHelper: ProductHelper;

 constructor() {
  this.productHelper = new ProductHelper();
 }

 /**
  * AddProduct
  */
 public AddProduct = (data: object): Promise<any> =>
  new Promise((resolve, reject) => {
   this.productHelper
    .save(data)
    .then((product) => {
     resolve({
      statusCode: 201,
      data: {
       message: 'Product successfully added.',
       product,
      },
     });
    })
    .catch((AddProductError) =>
     reject(
      new InternalServerError({
       message: 'Sorry, failed to add product.',
       source: {
        module: 'ProductService',
        method: 'AddProduct',
        trace: {
         message: AddProductError,
         line: new Error().stack?.split('\n')[1].trim() || '',
         timestamp: Date(),
         context: {
          body: { ...data },
         },
        },
       },
       type: 'product_error',
      })
     )
    );
  });

 /**
  * List
  */
 public List = (id: string): Promise<any> =>
  new Promise((resolve, reject) => {
   this.productHelper
    .retrieve(id)
    .then((product) => {
     if (!product) {
      reject(
       new NotFoundError({
        message: 'Sorry, product not found.',
        source: {
         module: 'ProductService',
         method: 'List',
         trace: {
          message: `Product Not Found: ${product}`,
          line: new Error().stack?.split('\n')[1].trim() || '',
          timestamp: Date(),
          context: {
           body: { productId: id },
          },
         },
        },
        type: 'product_error',
       })
      );
     }

     resolve({
      statusCode: 200,
      product,
     });
    })
    .catch((ListProductError) => {
     reject(
      new InternalServerError({
       message: 'Sorry, failed to retrieve product.',
       source: {
        module: 'ProductService',
        method: 'List',
        trace: {
         message: ListProductError,
         line: new Error().stack?.split('\n')[1].trim() || '',
         timestamp: Date(),
         context: {
          body: { productId: id },
         },
        },
       },
       type: 'product_error',
      })
     );
    });
  });

 /**
  * Filter
  */
 public Filter = (query: object): Promise<any> =>
  new Promise((resolve, reject) => {
   this.productHelper
    .filter(query)
    .then((products) => {
     if (!products) {
      reject(
       new NotFoundError({
        message: 'Sorry, failed to load products.',
        source: {
         module: 'ProductService',
         method: 'Filter',
         trace: {
          message: `Products Not Found: ${products}`,
          line: new Error().stack?.split('\n')[1].trim() || '',
          timestamp: Date(),
          context: {
           body: { ...query },
          },
         },
        },
        type: 'product_error',
       })
      );
     }

     resolve({
      statusCode: 200,
      products,
     });
    })
    .catch((FilterError) => {
     reject(
      new InternalServerError({
       message: 'Sorry, failed to load products.',
       source: {
        module: 'ProductService',
        method: 'Filter',
        trace: {
         message: FilterError,
         line: new Error().stack?.split('\n')[1].trim() || '',
         timestamp: Date(),
         context: {
          body: { ...query },
         },
        },
       },
       type: 'product_error',
      })
     );
    });
  });

 /**
  * Update
  */
 public Update = (id: string, data: object): Promise<any> =>
  new Promise((resolve, reject) => {
   this.productHelper
    .update(id, data)
    .then((updatedProduct) => {
     resolve({
      statusCode: 200,
      data: {
       message: 'Product successfully updated.',
       product: updatedProduct,
      },
     });
    })
    .catch((UpdateProductError) => {
     reject(
      new InternalServerError({
       message: 'Sorry, failed to update product.',
       source: {
        module: 'ProductService',
        method: 'Update',
        trace: {
         message: UpdateProductError,
         line: new Error().stack?.split('\n')[1].trim() || '',
         timestamp: Date(),
         context: {
          body: { productId: id, data },
         },
        },
       },
       type: 'product_error',
      })
     );
    });
  });

 /**
  * Delete
  */
 public Delete = (id: string): Promise<any> =>
  new Promise((resolve, reject) => {
   this.productHelper
    .delete(id)
    .then(() => {
     resolve({
      statusCode: 200,
      data: {
       message: 'Product successfully deleted.',
      },
     });
    })
    .catch((DeleteProductError) => {
     reject(
      new InternalServerError({
       message: 'Sorry, failed to delete product.',
       source: {
        module: 'ProductService',
        method: 'Delete',
        trace: {
         message: DeleteProductError,
         line: new Error().stack?.split('\n')[1].trim() || '',
         timestamp: Date(),
         context: {
          body: { productId: id },
         },
        },
       },
       type: 'product_error',
      })
     );
    });
  });
}
