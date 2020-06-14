import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientListingComponent } from './components/client-listing/client-listing.component';
import { ClientDialogComponent } from './components/client-dialog/client-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ClientListingComponent, ClientDialogComponent],
  exports: [
    ClientListingComponent
  ],
  entryComponents: [ClientDialogComponent]
})
export class ClientsModule { }
