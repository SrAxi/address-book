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

  private handleError<T>(errorMessage?: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // The error interceptor is printing already the error message in a user-friendly way.
      // But because we want to show more customized error messages here,
      // we'll override the error interceptor if a message has been passed as parameter
      if (errorMessage) {
        this.alertService.error(errorMessage, 5500);
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.endpoint).pipe(
      tap(() => {
      }),
      catchError(this.handleError<Contact[]>('An error occurred while trying to fetch the list of Contacts'))
    );
  }

  addContact(newContact: Contact): Observable<Contact[]> {
    return this.http.post<Contact[]>(this.endpoint, newContact).pipe(
      tap(() => this.alertService.success(`Contact was added to Address Book successfully!`)),
      // We're not sending a custom error because our fake-backend, in this case, already sends a user friendly error
      catchError(this.handleError<Contact[]>())
    );
  }

  editContact(newContact: Contact): Observable<Contact[]> {
    return this.http.patch<Contact[]>(this.endpoint, newContact).pipe(
      tap(() => this.alertService.success('Contact was edited successfully!'),
        catchError(this.handleError<Contact>(`An error occurred while trying to edit the following contact: ${newContact.email}`))
      ));
  }

  removeContact(newContact: Contact): Observable<Contact[]> {
    return this.http.request<Contact[]>('delete', this.endpoint, { body: newContact }).pipe(
      tap(() => this.alertService.success('Contact was removed successfully form your Address Book!'),
        catchError(this.handleError<Contact>(
          `An error occurred while trying to remove the following contact from your Address Book: ${newContact.email}`
        ))
      ));
  }
}
