import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListComponent } from './contact-list.component';
import { ContactService } from '../contact.service';
import { Contact } from '../../shared/models';
import { Observable } from 'rxjs/index';

class MockContactService {
  getContacts(): Observable<Contact[]> {
    return Observable.create([]);
  }

  addContact(newContact: Contact): Observable<Contact[]> {
    return Observable.create([]);
  }

  editContact(newContact: Contact): Observable<Contact[]> {
    return Observable.create([]);
  }

  removeContact(newContact: Contact): Observable<Contact[]> {
    return Observable.create([]);
  }
}

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactListComponent],
      providers: [
        { provide: ContactService, useClass: MockContactService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
