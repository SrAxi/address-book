import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { ContactListComponent } from './contact-list.component';
import { ContactService } from '../contact.service';
import { Contact } from '../../shared/models';
import { Observable, of } from 'rxjs/index';

const MOCK_CONTACTS: Contact[] = [
  {
    firstName: 'Riccardo',
    lastName: 'Polacci',
    email: 'test1@test.com',
    country: {
      code: 'IT',
      name: 'Italy'
    }
  },
  {
    firstName: 'Thor',
    lastName: 'Odinsson',
    email: 'thos@asgard.com',
    country: {
      code: 'NO',
      name: 'Norway'
    }
  }
];

class MockContactService {
  getContacts(): Observable<Contact[]> {
    return of(MOCK_CONTACTS);
  }

  addContact(newContact: Contact): Observable<Contact[]> {
    return of(MOCK_CONTACTS);
  }

  editContact(newContact: Contact): Observable<Contact[]> {
    return of(MOCK_CONTACTS);
  }

  removeContact(newContact: Contact): Observable<Contact[]> {
    return of(MOCK_CONTACTS);
  }
}

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let de: DebugElement;
  let spy: jasmine.Spy;
  let contactService: ContactService;

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
    // initialization
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    contactService = de.injector.get(ContactService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to call getContacts()', (() => {
    spy = spyOn(contactService, 'getContacts')
      .and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.contactList).toEqual(MOCK_CONTACTS, 'it should contain the mocked contact list');
  }));
});
