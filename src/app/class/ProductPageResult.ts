import {Product} from './Product';

export interface ProductPageResult {
  totalCount: number;
  products: Product[];
}