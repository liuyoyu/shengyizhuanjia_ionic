import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {AlertController, NavController, Slides, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordPage implements OnInit {

  constructor(private localStorage: LocalStorageService, private alertCtrl: AlertController,
              private navCtrl: NavController, private toastCtrl: ToastController,
              private router: Router) { }

  accout = '';

  ngOnInit() {
  }
  async  onClick() {
    const user = this.localStorage.get('user', '');
    if (this.accout === '') {
      const toast = await this.toastCtrl.create({
        message: '请输入您的邮箱或者手机号码',
        duration: 3000
      });
      toast.present();
    } else if (this.accout != user.accounts[0].identifier && this.accout != user.accounts[1].identifier) {
      const alert = await this.alertCtrl.create({
        header: '提示',
        message: '该账号为注册',
        buttons: ['知道了']
      });
      alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: '提示',
        message: '验证消息已发送，请及时查看',
        buttons: ['知道了']
      });
      alert.present();
      this.router.navigateByUrl('/login');
    }
  }

}
