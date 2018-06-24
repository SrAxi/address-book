import { WelcomeModule } from './welcome.module';

describe('WelcomeModule', () => {
  let welcomeModule: WelcomeModule;

  beforeEach(() => {
    welcomeModule = new WelcomeModule();
  });

  it('should create an instance of WelcomeModule', () => {
    expect(welcomeModule).toBeTruthy();
  });
});
