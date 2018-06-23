import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactManagementComponent } from './contact-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [ContactManagementComponent]
})
export class ContactManagementModule {
}
