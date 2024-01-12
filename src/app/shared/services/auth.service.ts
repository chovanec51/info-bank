import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { AuthRequest } from '../models/auth-request.model';
import { AuthUser } from '../models/auth-user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.api_key;
  authenticatedUser: BehaviorSubject<AuthUser> = new BehaviorSubject(null);
  private _logoutTimeout: any;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const request: AuthRequest = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    return this.http.post<AuthResponse>(this.url, request)
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(
            response.localId,
            response.idToken,
            (+response.expiresIn)*1000,
            response.registered
          );
        })
      );
  }

  logout() {
    const storedUser: string = localStorage.getItem('authUser');
    if (storedUser) {
      clearTimeout(this._logoutTimeout);
      this.authenticatedUser.next(null);
      localStorage.removeItem('authUser');
    }
  }

  autoLogin() {
    const storedUser: string = localStorage.getItem('authUser');
    if (storedUser) {
      const authUser: AuthUser = this.castJSONtoAuthUser(JSON.parse(storedUser));
      if (authUser.token) {
        const expirationDuration: number = authUser.expirationDate.getTime() - new Date().getTime();
        this.authenticatedUser.next(authUser);
        this.autoLogout(expirationDuration);
      }
    }
  }

  private castJSONtoAuthUser(parsedJson: any): AuthUser {
    return new AuthUser(
      parsedJson.userId,
      parsedJson._token,
      parsedJson._expireDateStr
    );
  }

  private autoLogout(expirationDuration: number) {
    this._logoutTimeout = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(userId: string, tokenId: string, expiresInMili: number, registered: boolean) {
    if (!registered || !tokenId) {
      return;
    }

    const expirationDateMili: number = new Date().getTime() + expiresInMili;
    const authUser: AuthUser = new AuthUser(userId, tokenId, expirationDateMili.toString());
    localStorage.setItem('authUser', JSON.stringify(authUser));
    this.authenticatedUser.next(authUser);
    this.autoLogout(expiresInMili);
  }

  private handleError(err: any) {
    const message = "Nastala neznáma chyba pri prihlasovaní";
    console.log(err);
    return throwError(() => message);
  }
}
