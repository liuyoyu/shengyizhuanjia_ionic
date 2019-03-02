import { Component, OnInit } from '@angular/core';
import {Product} from "../../class/Product";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {AlertController, NavController, ToastController} from "@ionic/angular";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-modefy-inventory',
  templateUrl: './modefy-inventory.page.html',
  styleUrls: ['./modefy-inventory.page.scss'],
})
export class ModefyInventoryPage implements OnInit {
  inOrOut: string;
  product: Product;
  num: number;
  infor = {
    'putInInventory': '入库数量',
    'getOutInventory': '出库数量'
  };
  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private navCtrl: NavController, private router: Router,
              private localStory: LocalStorageService) {
    const barcode = this.activatedRoute.snapshot.params['barcode'];
    this.product = this.productService.getProductByBarcode(barcode);
  }

  /**
   * 点击确定，进行数量验证，若不符返回友好信息
   * @returns {Promise<void>}
   */
  async onClick() {
    if (this.num <= 0) {
      const alert = await this.alertCtrl.create({
        header: '提示',
        message: '输入值必须大于零',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    if (this.inOrOut == 'putInInventory') {
      this.product.inventory += this.num;
    } else {
      if (this.product.inventory - this.num < 0) {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '出库数量不能大于库存',
          buttons: ['OK']
        });
        await alert.present();
        return ;
      } else {
        this.product.inventory -= this.num;
      }
    }
    const res = this.productService.modefyProduct(this.product);
    if (res) {
      console.log('保存成功');
      this.navCtrl.navigateForward(['/productDetails', this.product.barcode]);
      const toast = await this.toastCtrl.create({
        message: '保存成功',
        duration: 2000,
      });
      await toast.present();
    } else {
      console.log('保存失败');
      const alert = await this.alertCtrl.create({
        header: '提示',
        message: '出现未知错误',
        buttons: ['OK']
      });
      await alert.present();
    }
    this.modefyLogUpdate(this.inOrOut, this.num, res);
    console.log('添加至日志');
  }

  /**
   * 查看出入库记录
   */
  seeLog() {
    this.navCtrl.navigateForward('/log');
  }
  /**
   * 修改日志
   * @param {string} statu
   * @param {number} num
   */
  async modefyLogUpdate(statu: string, num: number, res: boolean) {
    statu = statu == 'putInInventory' ? '入库数量' : '出库数量';
    const log = this.localStory.get('modefyLog', []);
    const time = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString(); // 北京时间
    const message = time + ':' + statu + ':' + num + ':' + '修改成功:' + res;
    log.unshift(message);
    this.localStory.set('modefyLog', log);
  }
  ionViewDidLeave() {
    this.num = null;
  }
  ngOnInit() {
  }
}
