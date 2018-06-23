import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { Contact } from '../models';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for contacts, in a real life application this data would be retrieved from a DB
    const contacts: Contact[] = JSON.parse(localStorage.getItem('contacts')) || [];

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      /**
       * Gets the list of saved contacts from the LocalStorage
       *
       * GET /contacts
       */
      if (request.url.endsWith('/api/contacts') && request.method === 'GET') {
        // returning the object retrieved from LocalStorage
        return of(new HttpResponse({ status: 200, body: contacts }));
      }

      /**
       * Adds a new contact to the existing list of saved contacts
       *
       * POST /contacts
       */
      if (request.url.endsWith('/api/contacts') && request.method === 'POST') {
        // get new contact object from post body
        const newContact: Contact = request.body;

        // validation
        const duplicateContact = contacts.filter(contact => {
          return contact.email === newContact.email;
        }).length;
        if (duplicateContact) {
          return throwError({ error: { message: `Contact with email "${newContact.email}" is already in your address book` } });
        }

        // save new contact
        contacts.push(newContact);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        // respond 200 OK
        return of(new HttpResponse({ status: 200, body: contacts }));
      }

      /**
       * Deletes a contact from the contact list
       *
       * DELETE /contacts
       */
      if (request.url.endsWith('/api/contacts') && request.method === 'DELETE') {
        // find contact by email in contacts array
        const newContact: Contact = request.body;

        const newContactList = contacts.filter((contact: Contact) => contact.email !== newContact.email);

        console.log(contacts, 'contacts');
        console.log(newContactList, 'newContactList');

        // Save new contact list
        localStorage.setItem('contacts', JSON.stringify(newContactList));

        // respond 200 OK
        return of(new HttpResponse({ status: 200, body: newContactList }));
      }

      /**
       * Edits an existing contact from the contact list
       *
       * PATCH /contacts
       */
      if (request.url.endsWith('/api/contacts') && request.method === 'PATCH') {
        // find contact by email in contacts array
        const newContact: Contact = request.body;

        // Just removing the contact to be edited in order to add the new version of it
        const newContactList = contacts.filter((contact: Contact) => contact.email !== newContact.email);

        // Adding the new version of the deleted contact
        newContactList.push(newContact);

        console.log(contacts, 'contacts');
        console.log(newContactList, 'newContactList');

        // Save new contact list
        localStorage.setItem('contacts', JSON.stringify(newContactList));

        // respond 200 OK
        return of(new HttpResponse({ status: 200, body: newContactList }));
      }

      // pass through any requests not handled above
      return next.handle(request);
    }))

    // call materialize and dematerialize to ensure delay even if an error is thrown
      .pipe(materialize())
      .pipe(delay(1500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
