import { ContactListModule } from './contact-list.module';

describe('ContactListModule', () => {
  let contactListModule: ContactListModule;

  beforeEach(() => {
    contactListModule = new ContactListModule();
  });

  it('should create an instance', () => {
    expect(contactListModule).toBeTruthy();
  });
});
