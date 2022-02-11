import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePostDataComponent } from './component/post/change-post-data/change-post-data.component';
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
  {
    path: 'post/change/:id',
    component: ChangePostDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
