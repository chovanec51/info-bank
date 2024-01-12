import { HttpEvent, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable, exhaustMap, map, take } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const AuthInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>, 
    next: HttpHandlerFn
    ): Observable<HttpEvent<any>> => {
        return inject(AuthService).authenticatedUser.pipe(
            take(1),
            exhaustMap(authUser => {
                if (!authUser || !authUser.token) {
                    return next(req);
                }
                const modified = req.clone({
                    params: new HttpParams().set('auth', authUser.token)
                });
                return next(modified);
            })
        );
    }