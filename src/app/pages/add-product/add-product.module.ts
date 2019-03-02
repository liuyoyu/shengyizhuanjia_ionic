import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddProductPage } from './add-product.page';
import {SelectSupplierPage} from "../select-supplier/select-supplier.page";

const routes: Routes = [
  {
    path: '',
    component: AddProductPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AddProductPage,
    SelectSupplierPage
  ],
  entryComponents: [
    SelectSupplierPage
  ],
})
export class AddProductPageModule {}
