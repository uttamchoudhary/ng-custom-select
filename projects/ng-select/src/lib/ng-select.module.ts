import { NgModule } from '@angular/core';
import { NgSelectComponent } from './ng-select.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [NgSelectComponent],
  exports: [NgSelectComponent]
})
export class NgSelectModule { }
