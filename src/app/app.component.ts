import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AlertComponent } from './shared/alert/alert.component';
import { InfoService } from './shared/services/info.service';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  errorMessage = '';
  private infoSub: Subscription;
  
  constructor(private infoService: InfoService, private authService: AuthService) {}

  ngOnInit() {
    this.infoSub = this.infoService.infoFetchError.subscribe({
      next: errMessage => {
        this.errorMessage = errMessage;
      }
    });
    this.authService.autoLogin();
  } 

  ngOnDestroy() {
    this.infoSub.unsubscribe();
  }
}
