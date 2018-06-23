import { ContactManagementModule } from './contact-management.module';

describe('ContactManagementModule', () => {
  let contactManagementModule: ContactManagementModule;

  beforeEach(() => {
    contactManagementModule = new ContactManagementModule();
  });

  it('should create an instance', () => {
    expect(contactManagementModule).toBeTruthy();
  });
});
