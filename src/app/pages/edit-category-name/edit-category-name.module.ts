import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditCategoryNamePage } from './edit-category-name.page';

const routes: Routes = [
  {
    path: '',
    component: EditCategoryNamePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditCategoryNamePage]
})
export class EditCategoryNamePageModule {}
