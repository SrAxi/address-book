import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../shared/models';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertService } from '../shared/alert';

@Injectable()
export class ContactService {
  private endpoint = '/api/contacts';

  constructor(private http: HttpClient, private alertService: AlertService) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.alertService.error(`${operation} failed: ${error.message}`, 5500);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.endpoint).pipe(
      tap(() => {
        },
        catchError(this.handleError<Contact>(`Getting list of Contacts`))
      ));
  }

  addContact(newContact: Contact): Observable<Contact[]> {
    return this.http.post<Contact[]>(this.endpoint, newContact).pipe(
      tap(() => this.alertService.success(`Contact was added to Address Book successfully!`),
        catchError(this.handleError<Contact>(`Adding ${newContact.email} to Contacts`))
      ));
  }

  editContact(newContact: Contact): Observable<Contact[]> {
    return this.http.patch<Contact[]>(this.endpoint, newContact).pipe(
      tap(() => this.alertService.success('Contact was edited successfully!'),
        catchError(this.handleError<Contact>(`Editing ${newContact.email} in Contacts`))
      ));
  }

  removeContact(newContact: Contact): Observable<Contact[]> {
    return this.http.request<Contact[]>('delete', this.endpoint, { body: newContact }).pipe(
      tap(() => this.alertService.success('Contact was removed successfully form your Address Book!'),
        catchError(this.handleError<Contact>(`Removing ${newContact.email} from Contacts`))
      ));
  }
}
