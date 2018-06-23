import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { ContactListModule } from './contacts/contact-list/contact-list.module';
import { WelcomeModule } from './welcome/welcome.module';
import { ContactManagementModule } from './contacts/contact-management/contact-management.module';
import { fakeBackendProvider } from './shared/helpers';
import { AlertComponent, AlertService } from './shared/alert';

@NgModule({
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
    fakeBackendProvider // Our fake-backend interceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
