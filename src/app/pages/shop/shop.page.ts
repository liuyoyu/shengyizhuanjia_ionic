import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShopPage implements OnInit {
  shop: any;
  signup: any;
  constructor(private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  /**
   * 进入页面时初始化
   */
  ionViewWillEnter(){
    this.shop = this.localStorageService.get('shop',
      {
        shopName: '',
        shortName: '',
        phone: this.localStorageService.get('user', '').accounts[0].identifier,
        email: this. localStorageService.get('user', '').accounts[1].identifier,
        shopKeeperName: '',
        shopTel: ''
      });
    this.signup = this.localStorageService.get('signupTime', '');
  }
}
