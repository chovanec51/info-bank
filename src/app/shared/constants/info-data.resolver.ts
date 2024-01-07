import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { InfoItem } from "../models/info-item.model";
import { Observable } from "rxjs";
import { inject } from "@angular/core";
import { InfoService } from "../services/info.service";

export const resolveAllInfo: ResolveFn<Observable<InfoItem[]>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    return inject(InfoService).getAll();
}

export const resolveInfoByTopic: ResolveFn<Observable<InfoItem[]>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    return inject(InfoService).getByTopic(route.params['topic']);
}
