import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../enviroments/environment';
import {
  HOME_CONTENT,
  HOME_CONTENT_BY_SLUG,
  PHOTOS,
  PHOTOS_DETAILS,
  VIDEOS,
} from '../enviroments/api-path';

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

  getPhotos(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + PHOTOS);
  }
  getPhotosDetails(slug: string): Observable<any> {
    return this.httpClient.get(
      `${environment.apiBaseUrl}${PHOTOS_DETAILS}${slug}`
    );
  }

  getViideos(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + VIDEOS);
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
