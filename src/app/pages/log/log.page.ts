import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  log: any;
  constructor(private localStorage: LocalStorageService) {
    this.ionViewDidEnter();
  }
  ionViewDidEnter() {
    this.log = this.localStorage.get('modefyLog', []);
  }
  ngOnInit() {
  }

}
