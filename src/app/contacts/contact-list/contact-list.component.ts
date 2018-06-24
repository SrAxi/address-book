import { Component, OnInit } from '@angular/core';
import { Contact } from '../../shared/models';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contactList: Contact[] = [];

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    // Getting the contact list to populate the table
    this.contactService.getContacts().subscribe(
      (contacts: Contact[]) => this.contactList = contacts,
      error => console.error(error));
  }
}
