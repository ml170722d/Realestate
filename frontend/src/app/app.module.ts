import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/auth/login/login.component';
import { LogoutComponent } from './component/auth/logout/logout.component';
import { UserComponent } from './component/user/user.component';
import { AdminComponent } from './component/user/admin/admin.component';
import { UserListComponent } from './component/user/user-list/user-list.component';
import { UserBasicInfoComponent } from './component/user/user-list/user-basic-info/user-basic-info.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { AgencyListComponent } from './component/agency/agency-list/agency-list.component';
import { AgencyBasicInfoComponent } from './component/agency/agency-list/agency-basic-info/agency-basic-info.component';
import { AgencyComponent } from './component/agency/agency.component';
import { LocationComponent } from './component/location/location.component';
import { LocationListComponent } from './component/location/location-list/location-list.component';
import { LocationBasicInfoComponent } from './component/location/location-list/location-basic-info/location-basic-info.component';
import { PostComponent } from './component/post/post.component';
import { PostListComponent } from './component/post/post-list/post-list.component';
import { PostBasicInfoComponent } from './component/post/post-list/post-basic-info/post-basic-info.component';
import { WelcomeComponent } from './component/user/welcome/welcome.component';
import { UserPageComponent } from './page/user-page/user-page.component';
import { RegisterPageComponent } from './page/register-page/register-page.component';
import { RegisterFormComponent } from './component/form/register-form/register-form.component';
import { AgencyFormComponent } from './component/form/agency-form/agency-form.component';
import { LocationFormComponent } from './component/form/location-form/location-form.component';
import { ChangePassComponent } from './component/auth/change-pass/change-pass.component';
import { ChangeDataComponent } from './component/user/change-data/change-data.component';
// import { AdvertiserComponent } from './component/user/advertiser/advertiser.component';
import { BuyerComponent } from './component/user/buyer/buyer.component';
import { SearchFormComponent } from './component/form/search-form/search-form.component';
import { SearchListComponent } from './component/search-list/search-list.component';
import { FavBtnComponent } from './component/fav-btn/fav-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    UserComponent,
    AdminComponent,
    UserListComponent,
    UserBasicInfoComponent,
    LoginPageComponent,
    AgencyListComponent,
    AgencyBasicInfoComponent,
    AgencyComponent,
    LocationComponent,
    LocationListComponent,
    LocationBasicInfoComponent,
    PostComponent,
    PostListComponent,
    PostBasicInfoComponent,
    WelcomeComponent,
    UserPageComponent,
    RegisterPageComponent,
    RegisterFormComponent,
    AgencyFormComponent,
    LocationFormComponent,
    ChangePassComponent,
    ChangeDataComponent,
    // AdvertiserComponent,
    BuyerComponent,
    SearchFormComponent,
    SearchListComponent,
    FavBtnComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
