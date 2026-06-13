import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private router: Router) {}

  login() {
    localStorage.setItem('token', 'demo');
    this.router.navigate(['/pay']);
  }
}