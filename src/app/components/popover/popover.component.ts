import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  barcode: string;
  constructor(private alertCtrl: AlertController, private activateRout: ActivatedRoute) {
    activateRout.queryParams.subscribe(queryParams => {
      this.barcode = queryParams.barcode;
      console.log(this.barcode, queryParams);
    });
  }

  ngOnInit() {
  }
  async deleteProduct(){
    const alert = await this.alertCtrl.create({
      header: '删除',
      message: '确定删除该商品信息？',
      buttons: [
        {
          text: '确定',
          handler: () => {
          console.log('删了');
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
  }
  async alertProduct() {
    console.log('修改商品');
  }
}
