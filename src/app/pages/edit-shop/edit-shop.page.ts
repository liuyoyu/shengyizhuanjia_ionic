import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {NavController, ToastController} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.page.html',
  styleUrls: ['./edit-shop.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditShopPage implements OnInit {
  title: string;
  property: string;
  value: any; // 用于ngModel，从shop对象的相关属性中获取数据
  shop: any; // 用于保存从本地存储中获得店铺数据
  constructor(private activatedRoute: ActivatedRoute, private localStorageService: LocalStorageService,
              private toastCtrl: ToastController, private statusBar: StatusBar,
              private navCtrl: NavController, private router: Router) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.property = queryParams.property;
      this.title = queryParams.title;
    });
    // 沉浸式并且悬浮透明
    this.statusBar.overlaysWebView(true);
  }
  ngOnInit() {
  }

  /**
   * 保存用户修改
   */
  async onSave() {
    this.shop = this.localStorageService.get('shop',
      {
        shopName: '',
        shortName: '',
        phone: this.localStorageService.get('user', '').accounts[0].identifier,
        email: this. localStorageService.get('user', '').accounts[1].identifier,
        shopKeeperName: '',
        shopTel: ''
      });
      this.shop[this.property] = this.value;
      this.localStorageService.set('shop', this.shop);
      this.value = '';
      const toast = await this.toastCtrl.create({
        message: '保存成功',
        duration: 3000
      });
      toast.present();

    this.router.navigateByUrl('/shop');
  }
}
