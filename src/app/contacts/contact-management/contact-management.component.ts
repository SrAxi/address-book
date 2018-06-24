import { Component, OnInit } from '@angular/core';
import { Contact } from '../../shared/models/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../shared/alert/index';
import { Country } from '../../shared/models/country.model';
import { Observable } from 'rxjs/index';
import { debounceTime, map } from 'rxjs/internal/operators';
import { ContactService } from '../contact.service';

declare const require: any;
const countries: Country[] = require('country-list')().getData();

@Component({
  selector: 'app-contact-management',
  templateUrl: './contact-management.component.html',
  styleUrls: ['./contact-management.component.scss']
})
export class ContactManagementComponent implements OnInit {
  contactList: Contact[];
  newContactForm: FormGroup;
  selectedContact = false;

  constructor(private formBuilder: FormBuilder,
              private alertService: AlertService,
              private contactService: ContactService) {
  }

  ngOnInit() {
    // Getting the contact list for the typeAhead search
    this.contactService.getContacts().subscribe(
      (contacts: Contact[]) => this.contactList = contacts,
      error => console.error(error));

    // Setting up the form
    this.setupForm();
  }

  /*  TypeAhead handlers  */
  searchCountry = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term.length < 2 ? []
        : countries.filter((country: Country) => country.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchContact = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term.length < 2 ? []
        : this.contactList.filter((contact: Contact) =>
          contact.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
          contact.lastName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  countryFormatter = (country: Country) => country.name;
  contactFormatter = (contact: Contact) => {
    this.setupForm(contact);
    this.selectedContact = true;
    return `${contact.firstName} ${contact.lastName}`;
  }

  /*  Contact's CRUD operations */
  private addContact(newContact: Contact) {
    this.contactService.addContact(newContact).subscribe(
      (contacts: Contact[]) => this.successHandler(contacts),
      error => {
        // Just in case this subscription fails. The http error handling is being done in the service
        console.error(error);
      });
  }

  private editContact(newContact: Contact) {
    this.contactService.editContact(newContact).subscribe(
      (contacts: Contact[]) => this.successHandler(contacts),
      error => console.error(error));
  }

  removeContact(newContact: Contact) {
    this.contactService.removeContact(newContact).subscribe(
      (contacts: Contact[]) => {
        this.resetForm();
        this.contactList = [...contacts];
      },
      error => console.error(error));
  }

  private successHandler(contacts: Contact[]) {
    this.resetForm();

    // Because our 'BE' always returns us an updated version of the Contacts object, we'll update our object here
    if (contacts) {
      this.contactList = [...contacts];
    }
  }

  /* Form handlers and methods */
  get f() {
    // getter for accessing easier the form fields
    return this.newContactForm.controls;
  }

  onSubmit(operation: string) {
    // stop here if form is invalid
    if (this.newContactForm.invalid) {
      this.alertService.error('The submitted form is invalid');
      return;
    }

    operation === 'add' ? this.addContact(this.newContactForm.value) : this.editContact(this.newContactForm.value);
  }

  resetForm() {
    this.newContactForm.reset();
    this.selectedContact = false;
  }

  private setupForm(contact?: Contact) {
    this.newContactForm = this.formBuilder.group({
      firstName: [contact && contact.firstName || '', Validators.required],
      lastName: [contact && contact.lastName || '', Validators.required],
      email: [contact && contact.email || '', [Validators.required, Validators.email]],
      country: [contact && contact.country || '', [Validators.required]]
    });
    if (contact) {
      this.newContactForm.markAsDirty();
    }
  }
}
