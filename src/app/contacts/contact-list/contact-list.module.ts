import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ContactListComponent]
})
export class ContactListModule {
}
