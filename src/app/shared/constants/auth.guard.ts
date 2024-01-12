import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable, exhaustMap, map, take } from "rxjs";

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<UrlTree | boolean> => {
    
    const router: Router = inject(Router);
    const navigateToUrl: string = state.url;
    return inject(AuthService).authenticatedUser.pipe(
        take(1),
        map(authUser => {
            if (!authUser || !authUser.token) {
                return router.createUrlTree(['/home']);
            }
            return true;
        })
    )
}