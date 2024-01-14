import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AlertComponent } from '../shared/alert/alert.component';
import { InfoService } from '../shared/services/info.service';
import { Subscription } from 'rxjs';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, AlertComponent, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage = '';
  isLoading = false;
  private infoSub: Subscription;

  constructor(private authService: AuthService, 
              private router: Router, 
              private route: ActivatedRoute,
              private infoService: InfoService) {}

  ngOnInit(): void {
    this.infoSub = this.infoService.infoFetchError.subscribe({
      next: errMessage => {
        this.errorMessage = errMessage;
      }
    });
  }

  onLogin(form: NgForm) {
    this.isLoading = true;
    const redirectTo = this.route.snapshot.queryParams['redirectTo'];
    
    this.authService.login(form.value.email, form.value.password).subscribe({
      next: response => {
        this.isLoading = false;
        if (redirectTo) {
          this.router.navigate([redirectTo]);
        }
      },
      error: err => {
        this.isLoading = false;
        this.infoService.infoFetchError.next(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.infoSub.unsubscribe();
  }
}
