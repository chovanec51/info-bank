import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, throwError } from 'rxjs';
import { InfoItem } from '../models/info-item.model';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private url:string = 'https://infobank-f3b8a-default-rtdb.europe-west1.firebasedatabase.app/info';
  infoItemSubject: BehaviorSubject<InfoItem> = new BehaviorSubject(null);
  infoFetchError: Subject<string> = new Subject();
  searchParam: Subject<string> = new Subject();

  constructor(private http: HttpClient) {}

  create(infoItem: InfoItem) {
    this.http.post<{name: string}>(this.url+'.json', infoItem)
      .pipe(
        catchError((err: any) => {
          return this.handleError(err);
        })
      )
      .subscribe({
        next: value => {
          console.log(value);
        }
      });
  }

  edit(infoItem: InfoItem) {
    this.http.patch(this.url+'/'+infoItem.dbId+'.json', infoItem)
      .pipe(
        catchError((err: any) => {
          return this.handleError(err);
        })
      )
      .subscribe({
        next: value => {
          console.log(value);
        }
      });
  }

  getAll(): Observable<InfoItem[]> {
    return this.http.get(this.url+'.json')
      .pipe(
        catchError((err: any) => {
          return this.handleError(err);
        }),
        map(infoObject => {
          const modifiedInfoItems: InfoItem[] = [];
          for (let dbId in infoObject) {
            if (infoObject.hasOwnProperty(dbId))
              modifiedInfoItems.push({...infoObject[dbId], dbId});
          }
          return modifiedInfoItems;
        })
      );
  }

  getByTopic(topic: string): Observable<InfoItem[]> {
    return this.http.get(this.url+'.json')
      .pipe(
        catchError((err: any) => {
          return this.handleError(err);
        }),
        map(infoObject => {
          const modifiedInfoItems: InfoItem[] = [];
          for (let dbId in infoObject) {
            if (infoObject.hasOwnProperty(dbId) && infoObject[dbId]['topic'] === topic)
              modifiedInfoItems.push({...infoObject[dbId], dbId});
          }
          return modifiedInfoItems;
        })
      );
  }

  private handleError(err: any): Observable<never> {
    const errMessage = 'Nastala chyba pri získavaní údajov zo servera. Chybu nahláste administrátorovi.'
    console.log(err);
    this.infoFetchError.next(errMessage);
    return throwError(() => err);
  }
}
