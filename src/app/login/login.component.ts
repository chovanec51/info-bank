import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}
  
  onLogin(form: NgForm) {
    const redirectTo = this.route.snapshot.queryParams['redirectTo'];
    
    this.authService.login(form.value.email, form.value.password).subscribe({
      next: response => {
        if (redirectTo) {
          this.router.navigate([redirectTo]);
        }
      }
    });
  }
}
