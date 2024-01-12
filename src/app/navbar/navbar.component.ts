import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private userSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.userSubscription = this.authService.authenticatedUser.subscribe({
      next: authUser => {
        this.isLoggedIn = authUser && authUser.token != null;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onSearch() {
    console.log("search");
  }

  onAuthenticate() {
    if (this.router.url.includes("/login")) {
      return;
    }

    if (!this.isLoggedIn) {
      this.router.navigate(['/login'], {queryParams: {redirectTo: this.router.url}});
    }
    else {
      this.authService.logout();
      this.isLoggedIn = false;
    }
  }
}
