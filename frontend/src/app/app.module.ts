import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';
import { UserCardComponent } from './components/user-list/user-card/user-card.component';
import { RegisterComponent } from './components/register/register.component';
// import { BotDetectCaptchaModule } from 'angular-captcha';
import { NewAgencyFormComponent } from './components/new-agency-form/new-agency-form.component';
import { NewLocationFormComponent } from './components/new-location-form/new-location-form.component';
import { ChangePassComponent } from './components/user/change-pass/change-pass.component';
import { RegiterPageComponent } from './components/regiter-page/regiter-page.component';
import { UploadImgComponent } from './components/upload-img/upload-img.component';
import { UserComponent } from './components/user/user.component';
import { WelcomeComponent } from './components/user/welcome/welcome.component';
import { AdminComponent } from './components/user/admin/admin.component';
import { AdvertiserComponent } from './components/user/advertiser/advertiser.component';
import { BuyerComponent } from './components/user/buyer/buyer.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { InfoComponent } from './components/user/info/info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangeComponent } from './components/user/change/change.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    UserCardComponent,
    RegisterComponent,
    NewAgencyFormComponent,
    NewLocationFormComponent,
    ChangePassComponent,
    RegiterPageComponent,
    UploadImgComponent,
    UserComponent,
    WelcomeComponent,
    AdminComponent,
    AdvertiserComponent,
    BuyerComponent,
    UserListComponent,
    InfoComponent,
    ChangeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    // BotDetectCaptchaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
