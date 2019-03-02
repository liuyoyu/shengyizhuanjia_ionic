import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StartAppService implements CanActivate {
  constructor(private localStorageService: LocalStorageService, private router: Router) { }
  canActivate(): boolean {
    const appConfig: any = this.localStorageService.get('App', {
      hasRun: false,
      version: '1.0.0'
    });
    if ( appConfig.hasRun === false ) {
      appConfig.hasRun = true;
      this.localStorageService.set('App', appConfig);
      return true;
    } else {
      const current = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '/');
      const loginTime = this.localStorageService.get('loginTime', '1995-10-20 00:00:00').replace(/-/g, '/');
      const sTime = new Date(current); // 开始时间
      const eTime = new Date(loginTime); // 结束时间
      const differ: any = ((sTime.getTime() - eTime.getTime()) / 1000 / 60 / 60).toFixed(0);
      if ( differ - 120 > 0) {
        this.router.navigateByUrl('/login');
      } else {
        this.router.navigateByUrl('/home');
      }
      return false;
    }
  }
}
