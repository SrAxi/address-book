import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AlertComponent, AlertService } from './shared/alert';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ContactManagementModule } from './contacts/contact-management/contact-management.module';
import { ContactListModule } from './contacts/contact-list/contact-list.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeModule } from './welcome/welcome.module';
import { HeaderComponent } from './navigation/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { APP_BASE_HREF } from '@angular/common';
import { ContactService } from './contacts/contact.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        AlertComponent,
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        NgHttpLoaderModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        WelcomeModule,
        ContactManagementModule,
        ContactListModule,
      ],
      providers: [
        AlertService,
        ContactService,
        { provide: APP_BASE_HREF, useValue: '/welcome' }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
  it(`should have as 'spinkit' property`, async(() => {
    expect(component.spinkit).toBeDefined();
  }));
});
