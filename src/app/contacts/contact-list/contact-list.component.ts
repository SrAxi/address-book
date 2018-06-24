import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../../shared/models/index';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contactList: Contact[] = [];

  constructor(private http: HttpClient, private contactService: ContactService) {
  }

  ngOnInit() {
    // Getting the contact list to populate the table
    this.contactService.getContacts().subscribe(
      (contacts: Contact[]) => this.contactList = contacts,
      error => console.error(error));
  }
}
