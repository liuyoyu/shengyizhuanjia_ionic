import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {timeoutWith} from "rxjs/internal/operators";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutUsPage implements OnInit {

  // time: any;
  // current: any;
  // differ: any;
  constructor(private localStorageService: LocalStorageService) {
    // this.current = new Date(+new Date()+8*3600*1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/,'');
    // this.time = this.localStorageService.get('signupTime', '');
    //
    // let endtime = this.time.replace(/-/g, "/");//将时间格式中的'-'转化为'/'
    // let starttime = this.current.replace(/-/g, "/");
    // let sTime = new Date(starttime); // 开始时间
    // let eTime = new Date(endtime); // 结束时间
    // this.differ = ((sTime.getTime() - eTime.getTime()) / 1000 / 60 / 60).toFixed(0);
  }

  ngOnInit() {
  }

}
