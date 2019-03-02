import {CommonModule} from "@angular/common";
import {CopyrightComponent} from "./copyright/copyright.component";
import {NgModule} from "@angular/core";
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CopyrightComponent, PopoverComponent],
  exports: [CopyrightComponent]
})
export class LyyModule { }