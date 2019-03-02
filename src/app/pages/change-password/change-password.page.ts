import { Component, OnInit } from '@angular/core';
import {UserServiceService} from "../../services/user-service.service";
import {NavController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  isOldPassword = true;
  oldpassword: string;
  newPassword: string;
  checkPassword: string;
  constructor(private userService: UserServiceService,
              private toastCtrl: ToastController,
              private navCtrl: NavController, private router: Router) { }
  async onSave() {console.log('onSave');
    const oldPass = this.userService.getPassword();
    this.isOldPassword = oldPass == this.oldpassword ? true : false;
    if (this.newPassword == this.checkPassword && this.isOldPassword) {
      this.userService.updatePassword(this.newPassword);
      console.log('修改成功');
      this.router.navigateByUrl('/setting');
      const toast = await this.toastCtrl.create({
        message: '修改成功',
        duration: 2000
      });
      await toast.present();
    }
  }

  ngOnInit() {
  }

}
