import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ContactManagementComponent } from './contact-management.component';
import { AlertService } from '../../shared/alert';
import { ContactService } from '../contact.service';
import { Observable, of } from 'rxjs';
import { Contact } from '../../shared/models';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

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

describe('ContactManagementComponent', () => {
  let component: ContactManagementComponent;
  let fixture: ComponentFixture<ContactManagementComponent>;
  let de: DebugElement;
  let spy: jasmine.Spy;
  let contactService: ContactService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgbModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [ContactManagementComponent],
      providers: [
        FormBuilder,
        AlertService,
        { provide: ContactService, useClass: MockContactService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // initialization
    fixture = TestBed.createComponent(ContactManagementComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    contactService = de.injector.get(ContactService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to call getContacts() and setupForm() onInit', (() => {
    spy = spyOn(contactService, 'getContacts')
      .and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.contactList).toEqual(MOCK_CONTACTS, 'it should contain the mocked contact list');
    expect(component.newContactForm).toBeDefined('It should be defined after calling setupForm()');
  }));
});
