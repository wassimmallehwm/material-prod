import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientListingComponent } from './components/client-listing/client-listing.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ClientListingComponent],
  exports: [
    ClientListingComponent
  ]
})
export class ClientsModule { }
