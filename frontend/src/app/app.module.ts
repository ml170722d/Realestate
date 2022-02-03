import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserWelcomeComponent } from './components/user-welcome/user-welcome.component';
import { RegisterComponent } from './components/register/register.component';
import { BotDetectCaptchaModule } from 'angular-captcha';
import { NewAgencyFormComponent } from './components/new-agency-form/new-agency-form.component';
import { NewLocationFormComponent } from './components/new-location-form/new-location-form.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    LogoutComponent,
    UserCardComponent,
    UserWelcomeComponent,
    RegisterComponent,
    NewAgencyFormComponent,
    NewLocationFormComponent,
    ChangePassComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BotDetectCaptchaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
