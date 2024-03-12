import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../enviroments/environment';
import { HOME_CONTENT, HOME_CONTENT_BY_SLUG } from '../enviroments/api-path';

@Injectable({
  providedIn: 'root',
})
export class ApiServicesService {
  constructor(private httpClient: HttpClient) {}

  getHomeContent(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + HOME_CONTENT);
  }

  getHomeContentBySlug(slug: any): Observable<any> {
    return this.httpClient.get(
      `${environment.apiBaseUrl}${HOME_CONTENT_BY_SLUG}${slug}`
    );
  }

  errorHandler(error: {
    error: {
      message: string;
    };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `${error.error.message}`;
    }
    console.log(error);
    return throwError(errorMessage);
  }
}
