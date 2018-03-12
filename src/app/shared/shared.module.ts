import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OrderByPipe } from 'app/pipes/order-by.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    OrderByPipe
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class SharedModule { }
