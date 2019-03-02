import { Component, OnInit } from '@angular/core';
import {AlertController, NavController, NavParams, PopoverController, ToastController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
  template: '<ion-item (click)="alertProduct()" lines="full" >\n' +
  '  修改商品\n' +
  '</ion-item>\n' +
  '<ion-item (click)="deleteProduct()" >\n' +
  '  删除商品\n' +
  '</ion-item>'
})
export class PopoverPage implements OnInit {
  barcode: string;
  constructor(private alertCtrl: AlertController, private navParams: NavParams,
              private productService: ProductService, private toastCtrl: ToastController,
              private navCtrl: NavController, private popoverCtrl: PopoverController) {
    this.barcode = this.navParams.data['barcode'];
    console.log(this.barcode);
  }
  async deleteProduct() {
    const alert = await this.alertCtrl.create({
      header: '删除',
      message: '确定删除该商品信息？',
      buttons: [
        {
          text: '确定',
          handler: async () => {
            const res = this.productService.deleteProductByBarcode(this.barcode);
            if (res === true) {
              const toast = await this.toastCtrl.create({
                message: '删除成功',
                duration: 2000
              });
              await toast.present();
              this.navCtrl.navigateForward('/productList');
            } else {
              const toast = await this.toastCtrl.create({
                message: '删除失败',
                duration: 2000
              });
              await toast.present();
            }
          }
        },
        {
          text: '取消',
          handler: () => {
            console.log('cancel');
          }
        }
      ]
    });
    await alert.present();
    this.popoverCtrl.dismiss();
  }
  alertProduct() {
    console.log('修改商品');
    //this.navCtrl.navigateForward(['/addProduct', this.barcode]);
    this.popoverCtrl.dismiss();
  }
  ngOnInit() {
  }

}
