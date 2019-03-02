import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private localStorageService: LocalStorageService) { }

  /**
   * 注册，保存用户信息
   * @param {string} phone
   * @param {string} email
   * @param {string} password
   * @param {string} shopname
   * @returns {Boolean}
   */
  signUp(phone: string, email: string, password: string, shopname: string): Boolean {
    const account = this.localStorageService.get('user', '');
    console.log('account:' + account);
    if (account != null && (phone == account.accounts[0].identifier || email == account.accounts[1].identifier)) {
      console.log('该账号已经注册过了');
      return false;
    }
    const user = {
      shopName: shopname,
      accounts: []
    };
    user.accounts[0] = { identifier: phone, passwordToken: password};
    user.accounts[1] = { identifier: email, passwordToken: password};
    this.localStorageService.set('user', user); console.log(user);

    const time = new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/,'');
    this.localStorageService.set('signupTime', time);
    return true;
  }

  /**
   * 验证登陆
   * @param {string} account
   * @param {string} password
   * @returns {Boolean}
   */
  login(account: string, password: string): boolean {
    const accounts = this.localStorageService.get('user', '').accounts;
    if (!(account == accounts[0].identifier && password == accounts[0].passwordToken)
      && !(account == accounts[1].identifier && password == accounts[1].passwordToken)) {
      return false; // 账号或密码错误
    }
    const loginTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    this.localStorageService.set('loginTime', loginTime);
    return true;
  }

  /**
   * 获取密码
   * @returns {string}
   */
  getPassword(): string {
    return this.localStorageService.get('user', '').accounts[0].passwordToken;
  }

  /**
   * 修改密码
   * @param {string} password
   * @returns {boolean}
   */
  updatePassword(password: string): boolean {
    const tmp = this.localStorageService.get('user', '');
    tmp.accounts[0].passwordToken = password;
    tmp.accounts[1].passwordToken = password;
    this.localStorageService.set('user', tmp);
    return true;
  }
}
