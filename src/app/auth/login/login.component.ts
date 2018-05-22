import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoginWithGoogle } from '../auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(private store: Store) {
  }

  loginWithGoogle() {
    this.store.dispatch(new LoginWithGoogle());
  }
}