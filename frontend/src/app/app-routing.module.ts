import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './component/post/post.component';
import { ChangeDataComponent } from './component/user/change-data/change-data.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { RegisterPageComponent } from './page/register-page/register-page.component';
import { UserPageComponent } from './page/user-page/user-page.component';

const routes: Routes = [
  {
    path: 'login',
    redirectTo: '',
  },
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'user',
    component: UserPageComponent,
  },
  {
    path: 'user/change/:id',
    component: ChangeDataComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'post/:id',
    component: PostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
