import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {version} from "punycode";
import {NavController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingPage implements OnInit {

  constructor(private localStorageService: LocalStorageService,
              private navCtrl: NavController, private router: Router) { }
    private version: any = '';

  ngOnInit() {
    const user = this.localStorageService.get('user', '');
    const app = this.localStorageService.get('App', {version: '1.0.0'});
    this.version = app.version;
  }

  /**
   * 拨打电话
   * @param phoneNumber
   */
  // onCall(phoneNumber) {
  //   window.location.href = 'tel:' + phoneNumber;
  // }

  /**
   * 退出当前账号
   */
  onLogout() {
    const config = this.localStorageService.get('App', '');
    config.hasRun = false;
    this.localStorageService.set('App', config);
    this.router.navigateByUrl('/login');
  }
}
