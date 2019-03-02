import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {AlertController, NavController, ToastController} from '@ionic/angular';
import {NgForm} from '@angular/forms';
import {UserServiceService} from '../../services/user-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginPage implements OnInit {

  username = '';
  password = '';

  constructor(private localStorageService: LocalStorageService, private navCtrl: NavController,
              private router: Router,
              private toastCtrl: ToastController, private alertCtrl: AlertController,
              private userService: UserServiceService) { }

  ngOnInit() {
  }

  async onLogin(form: NgForm) {
    // 账号为空时提示输入账号
    if (this.username === '') {
      const toast = await this.toastCtrl.create({
        message: '请输入您的手机号码或者邮箱',
        duration: 3000
      });
      toast.present();
    } else if (this.password === '') {
      const toast = await this.toastCtrl.create({
        message: '请输入您的密码',
        duration: 3000
      });
      toast.present();
    } else {
      // 密码不对时提示错误
      const accounts = this.localStorageService.get('user', '').accounts;
      if (!this.userService.login(this.username, this.password)) {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '用户名或者密码不正确',
          buttons: ['确定']
        });
        alert.present();
      } else {
        this.router.navigateByUrl('/home');
      }
    }
  }
  openForgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }

}
