import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MaterialModule } from '../material.module';
import { AuthState } from './auth.state';
import { LoginComponent } from './login/login.component';
import { AuthenticatedGuard } from './authenticated.guard';

export const AUTH_ROUTES: Routes = [
  { path: 'auth/login', component: LoginComponent },
];

@NgModule({
  imports: [
    AngularFireAuthModule,
    MaterialModule,

    RouterModule.forChild(AUTH_ROUTES),

    NgxsModule.forFeature([
      AuthState,
    ]),
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    AuthenticatedGuard
  ]
})
export class AuthModule {}