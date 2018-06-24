import { AppPage, MOCK_CONTACT } from './app.po';
import { browser, by, element } from 'protractor';
import { Contact } from '../../src/app/shared/models';

const { localStore } = require('./e2e-localstorage');

describe('address-book App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();

    // Resizing the browser screen so it enforces the responsive design and allow us to test the button toggle
    const width = 880;
    const height = 940;
    browser.driver.manage().window().setSize(width, height);
  });

  it('should display the header\'s title', () => {
    page.navigateTo();
    expect(page.getHeaderTitle()).toEqual('Address book');
  });

  it('should be in welcome page and displaying the welcome title', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toEqual('Welcome!');
    expect(browser.getCurrentUrl()).toMatch('/welcome', 'we should be in /welcome because is the default home view');
  });

  it(`should be able to navigate to 'Manage Contacts'`, () => {
    // The links are not visible because of responsive design
    page.toggleMenuBtn();
    browser.waitForAngular();

    const link = page.getMenuItem('Manage Contacts');

    link.click().then(function () {
      browser.waitForAngular();
      browser.sleep(1000).then(function () {
        expect(browser.getCurrentUrl()).toMatch('/contactManagement', 'it should navigate to /contactManagement');
      });
    });
  });

  it(`should be able to add a new contact`, () => {
    // Clearing localStorage
    localStore.clear();

    page.fillFormNew();

    // Waiting for eventual validation events
    browser.waitForAngular();

    const addBtn = page.getFormBtn('Add new contact');

    addBtn.click().then(function () {
      browser.waitForAngular();
      browser.sleep(1000).then(function () {
        localStore.getItem('contacts').then(contacts => {
          const contactAdded = JSON.parse(contacts).filter((contact: Contact) => contact.email === MOCK_CONTACT.email);
          expect(contactAdded).toBeTruthy('it should find the newly added contact');
        });
      });
    });
  });

  it(`should be able to edit an existing contact`, () => {
    // selecting an existing contact
    page.selectExistingContact(MOCK_CONTACT.firstName);

    // Waiting for eventual validation and form filling events
    browser.waitForAngular();

    // change contact name
    element(by.css('app-contact-management input#first_name')).clear().sendKeys('Loki');

    // Waiting for angular to set the button as not disabled
    browser.waitForAngular();

    const editBtn = page.getFormBtn('Edit contact');

    editBtn.click().then(function () {
      browser.waitForAngular();
      browser.sleep(1000).then(function () {
        localStore.getItem('contacts').then(contacts => {
          const contactExisting = JSON.parse(contacts).filter((contact: Contact) => contact.email === MOCK_CONTACT.email);
          expect(contactExisting).toBeTruthy('it should find the existing contact');
          expect(JSON.parse(contacts)[0].firstName).toEqual('Loki', 'it should have the updated name');
        });
      });
    });
  });

  it(`should be able to navigate to 'Contact List'`, () => {
    const link = page.getMenuItem('Contact List');

    link.click().then(function () {
      browser.waitForAngular();
      browser.sleep(1000).then(function () {
        expect(browser.getCurrentUrl()).toMatch('/contactList', 'it should navigate to /contactList');
      });
    });
  });

  it(`should be able to visualize the added contact in the table`, () => {
    const firstRowName = page.getTablesFirstRowName();

    expect(firstRowName).toBe('Loki', 'it should have the name of the contact we just edited');
  });

  it(`should be able to navigate to 'Manage Contacts' again`, () => {
    const link = page.getMenuItem('Manage Contacts');

    link.click().then(function () {
      browser.waitForAngular();
      browser.sleep(1000).then(function () {
        expect(browser.getCurrentUrl()).toMatch('/contactManagement', 'it should navigate to /contactManagement');
      });
    });
  });

  it(`should be able to remove an existing contact`, () => {
    // selecting an existing contact
    page.selectExistingContact('Loki');

    // Waiting for eventual validation and form filling events
    browser.waitForAngular();

    const removeBtn = page.getFormBtn('Remove contact');

    removeBtn.click().then(function () {
      browser.waitForAngular();
      browser.sleep(1000).then(function () {
        localStore.getItem('contacts').then(contacts => {
          const contactsEmpty = JSON.parse(contacts).length === 0;
          expect(contactsEmpty).toBeTruthy('contact list should be empty');
        });
      });
    });
  });
});
