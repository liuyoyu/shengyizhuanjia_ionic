import { Injectable } from '@angular/core';
import {Product} from '../class/Product';
import {AjaxResult} from '../class/ajax-result';
import {LocalStorageService} from './local-storage.service';
import {UUID} from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private localStorageService: LocalStorageService) { }

  /**
   * 添加新商品
   * @param {Product} input
   * @returns {Promise<AjaxResult>}
   */
  async insert(input: Product): Promise<AjaxResult>  {
    input.id = UUID.UUID(); // 自动生成ID
    const res = this.localStorageService.get('product', []);
    res.push(input);
    this.localStorageService.set('product', res);
    return {
      targetUrl: '',
      result: res,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }

  /**
   * 获取商品数据
   * @returns {Promise<AjaxResult>}
   */
  async getList(index: number, size: number): Promise<AjaxResult> {
    if (index < 0) {
      // 实际开发中应抛出异常类对象
      throw new Error('分页的索引应大于等于零');
    }
    if (size <= 0) {
      // 实际开发中应抛出异常类对象
      throw new Error('每页显示的记录数应大于零');
    }
    let tmp = this.localStorageService.get('product', []);
    tmp = tmp.slice((index - 1) * size, index * size);
    return {
      targetUrl: '',
      result: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }

  /**
   * 根据条件查找商品列表
   * @param {number} index
   * @param size
   * @param input
   * @returns {Promise<AjaxResult>}
   */
  async getListByCondition(index: number, size: 10, input: any): Promise<AjaxResult> {
    const productlist = this.localStorageService.get('product', []);
    let tmp = [];
    for (const p of productlist) {
      if (p.name == input || p.barcode == input || p.price == input) {
        tmp.push(p);
      }
    }
    const total = tmp.length;
    tmp = tmp.slice((index - 1) * size, index * size);
    return {
      targetUrl: '',
      result: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }
  /**
   * ID自增长(不使用）
   * @param {product[]} array
   * @returns {number}
   */
  autoIncrement(array: Product[]): string {
    if (array.length === 0) { return ''; }
    const new_id = array[length - 1].id + 1;
    return new_id;
  }
  /**
   * 商品总数量
   * @returns {Promise<AjaxResult>}
   */
  async totalNumberOfGoods(): Promise<AjaxResult> {
    const num = this.localStorageService.get('product', []).length;
    return {
      targetUrl: '',
      result: num,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }

  /**
   * 根据条码获取商品
   * @param {string} barcode
   * @returns {Promise<AjaxResult>}
   */
  getProductByBarcode(barcode: string): Product {
    const products = this.localStorageService.get('product', []);
    let res = this.initProduct();
    for (const p of products) {
      if (p.barcode == barcode) {
        res = p;
        break;
      }
    }
    return res;
  }

  /**
   * 修改商品信息
   * @param {Product} product
   * @returns {boolean}
   */
  modefyProduct(product: Product): boolean {
    const products = this.localStorageService.get('product', []);
    for (let i = 0; i < products.length; i++) {
      if (products[i].barcode == product.barcode) {
        products[i] = product;
        this.localStorageService.set('product', products);
        return true;
      }
    }
    return false;
  }
  /**
   * 初始化商品
   * @returns {Product}
   */
  initProduct(): Product {
    return {
      id: '',
      name: '',
      categoryId: null,
      categoryName: '',
      category: null,
      barcode: '', // 条码
      images: [],
      price: null, // 售价
      purchasePrice: null, // 进价
      inventory: null, // 库存
      supplier: null, // 供货商
      standard: '', // 规格
      remark: ''
    };
  }

  /**
   * 通过条码删除商品
   * @param {string} barcode
   * @returns {boolean}
   */
  deleteProductByBarcode(barcode: string): boolean{
    const tmp = this.localStorageService.get('product', []);
    if (tmp === null || tmp.length === 0) {
      return false;
    }
    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i].barcode == barcode) {
        tmp.splice(i, 1);
        this.localStorageService.set('product', tmp);
        return true;
      }
    }
    return false;
  }
}
