import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { InfoItem } from '../models/info-item.model';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private url:string = 'https://infobank-f3b8a-default-rtdb.europe-west1.firebasedatabase.app/info.jso';

  constructor(private http: HttpClient) {}

  create(infoItem: InfoItem) {
    this.http.post(this.url, infoItem)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe({
        next: value => {
          console.log(value);
        }
      });
  }

  getAll() {
    this.http.get(this.url)
      .pipe(
        catchError(this.handleError)
      )
  }

  getByTopic() {

  }

  getById() {

  }

  private handleError(err: any, caught: Observable<any>) {
    let errMessage = 'Unknown error has occured.'
    console.log(err);
    return errMessage;
  }
}
