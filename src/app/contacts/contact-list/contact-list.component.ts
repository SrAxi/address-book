import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../shared/alert/index';
import { Contact } from '../../shared/models/index';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contactList: Contact[] = [];

  constructor(private http: HttpClient, private alertService: AlertService) {
  }

  ngOnInit() {
    // Getting the contact list to populate the table
    this.http.get('/api/contacts').subscribe(
      (contacts: Contact[]) => {
        this.contactList = contacts;
      },
      error => {
        console.error(error);
        this.alertService.error(error.message);
      });
  }
}
