import { Injectable } from '@angular/core';
import {Supply} from "../class/Supply";
import {AjaxResult} from "../class/ajax-result";
import {LocalStorageService} from "./local-storage.service";
import {UUID} from "angular2-uuid";

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

  constructor(private localStorageService: LocalStorageService) { }

  /**
   * 添加供应商
   * @param {Supply} supply
   * @returns {Promise<AjaxResult>}
   */
  async insert(supply: Supply): Promise<AjaxResult> {
    supply.id = UUID.UUID();
    let tmp = this.localStorageService.get('Supply', []);
    tmp.push(supply);
    this.localStorageService.set('Supply', tmp);
    return {
      targetUrl: '',
      result: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }
  async getAll(): Promise<AjaxResult>{
    const tmp = this.localStorageService.get('Supply', []);
    return {
      targetUrl: '',
      result: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }
}
