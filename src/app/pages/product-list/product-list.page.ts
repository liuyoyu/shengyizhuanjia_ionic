import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {InfiniteScroll, LoadingController, ToastController} from '@ionic/angular';
import {AjaxResult} from '../../class/ajax-result';
import {ProductService} from '../../services/product.service';
import {Product} from '../../class/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductListPage implements OnInit {
  currentIndex: number; // 当前页码，显示哪一页的商品数据
  products: Product[]; // 存放商品数据
  total: number; // 商品总记录数
  inventory: number; // 总正库存
  price: number;
  queryTerm: string; // 查询条件
  categoryId: number; // 类别编号用于保存用户选择的类别，初始值威-1
  constructor(private loadingCtrl: LoadingController, private productService: ProductService,
              private toastCtrl: ToastController) {
    this.categoryId = -1;
  }
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: '正在加载数据，请稍候...',
      spinner: 'bubbles',
    });
    loading.present();
    try {
      this.ionViewDidEnter();
      loading.dismiss();
    } catch (error) {
      console.log(error);
    }

  }
  async ionViewDidEnter() {
    this.categoryId = -1;
    this.currentIndex = 1;
    this.productService.totalNumberOfGoods().then((data) => {
      this.total = data.result;
    });
    this.inventory = 0;
    this.price = 0;
    const ajaxResult: AjaxResult = await this.productService.getList(this.currentIndex, 10);
    this.products = ajaxResult.result;
    for (const product of this.products) {
      this.inventory += product.inventory;
      this.price += product.price;
    }
  }
  /**
   * 查询商品数据
   */
  async onInput(event) {
    this.currentIndex = 1;
    const condition = event.target.value;
    try {
      if (condition == '') {
        this.ionViewDidEnter();
    } else {
        this.categoryId = -1;
        this.currentIndex = 1;
        this.inventory = 0;
        this.price = 0;
        const ajaxResult: AjaxResult = await this.productService.getListByCondition(this.currentIndex, 10, condition);
        this.products = ajaxResult.result;
        for (const product of this.products) {
          this.inventory += product.inventory;
          this.price += product.price;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 下滑刷新
   * @param event
   * @returns {Promise<void>}
   */
  async onRefresh(event) {
    this.currentIndex = 1;
    const refresh = event.target;
    try {
      this.inventory = 0;
      this.price = 0;
      const ajaxResult: AjaxResult = await this.productService.getList(this.currentIndex, 10);
      this.products = ajaxResult.result;
      for (const product of this.products) {
        this.inventory += product.inventory;
        this.price += product.price;
      }
    } catch (error) {
      console.log('出现错误');
      console.log(error);
    }
    refresh.complete();
  }

  async onInfinite(event) {
    const infiniteScroll = event.target;
    this.currentIndex++;
    const ajaxResult: AjaxResult = await this.productService.getList(this.currentIndex, 10);
    if (this.total - (this.currentIndex - 1) * 10) {
      const toast = await this.toastCtrl.create({
        message: '已是最后一页',
        duration: 3000
      });
      toast.present();
    } else {
      this.inventory = 0;
      this.price = 0;
      this.products = ajaxResult.result;
      for (const product of this.products) {
        this.inventory += product.inventory;
        this.price += product.price;
      }
    }
    infiniteScroll.complete();
  }
}
