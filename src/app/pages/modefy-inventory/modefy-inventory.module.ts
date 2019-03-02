import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModefyInventoryPage } from './modefy-inventory.page';

const routes: Routes = [
  {
    path: '',
    component: ModefyInventoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModefyInventoryPage]
})
export class ModefyInventoryPageModule {}
