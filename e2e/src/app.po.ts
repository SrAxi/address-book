import { browser, by, element, protractor } from 'protractor';
import { Contact } from '../../src/app/shared/models';


export const MOCK_CONTACT: Contact = {
  firstName: 'Thor',
  lastName: 'Odinsson',
  email: 'thor@asgard.com',
  country: {
    code: 'NO',
    name: 'Norway'
  }
};

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  /*  Getters  */
  getPageTitle() {
    return element(by.css('app-root h1')).getText();
  }

  getHeaderTitle() {
    return element(by.css('app-header h2')).getText();
  }

  getMenuItem(text: string) {
    return element(by.cssContainingText('app-header a.nav-link', text));
  }

  getFormBtn(text: string) {
    return element(by.cssContainingText('app-contact-management div.form-group button', text));
  }

  getTablesFirstRowName() {
    return element(by.css('app-contact-list table > tbody > tr:nth-child(1) > td:nth-child(1)')).getText();
  }

  /*  Handlers  */
  toggleMenuBtn() {
    element(by.css('button.navbar-toggler')).click();
  }

  fillFormNew() {
    // Filling the form
    element(by.css('app-contact-management input#first_name')).sendKeys(MOCK_CONTACT.firstName);
    element(by.css('app-contact-management input#last_name')).sendKeys(MOCK_CONTACT.lastName);
    element(by.css('app-contact-management input#email')).sendKeys(MOCK_CONTACT.email);
    element(by.css('app-contact-management input#country')).sendKeys(MOCK_CONTACT.country.name).sendKeys(protractor.Key.ENTER);
  }

  selectExistingContact(searchText: string) {
    element(by.css('app-contact-management input#contact_selector')).clear().sendKeys(searchText).sendKeys(protractor.Key.ENTER);
  }
}
