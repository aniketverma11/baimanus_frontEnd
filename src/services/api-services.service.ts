import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../enviroments/environment';
import {
  HOME_CONTENT,
  HOME_CONTENT_BY_SLUG,
  PHOTOS,
  PHOTOS_DETAILS,
  SEARCH,
  VIDEOS,
  VIDEOS_DETAILS,
} from '../enviroments/api-path';

@Injectable({
  providedIn: 'root',
})
export class ApiServicesService {
  constructor(private httpClient: HttpClient) {}

  getHomeContent(type: string): Observable<any> {
    const url = `${environment.apiBaseUrl}${HOME_CONTENT}?type=${type}`;
    return this.httpClient.get(url);
  }

  getHomeContentBySlug(slug: any, type: string): Observable<any> {
    return this.httpClient.get(
      `${environment.apiBaseUrl}${HOME_CONTENT_BY_SLUG}${slug}?type=${type}`
    );
  }

  getPhotos(type: any): Observable<any> {
    const url = `${environment.apiBaseUrl}${PHOTOS}?type=${type}`;
    return this.httpClient.get(url);
  }
  getPhotosDetails(slug: string, type: any): Observable<any> {
    return this.httpClient.get(
      `${environment.apiBaseUrl}${PHOTOS_DETAILS}${slug}?type=${type}`
    );
  }
  getVideosDetails(slug: string): Observable<any> {
    return this.httpClient.get(
      `${environment.apiBaseUrl}${VIDEOS_DETAILS}${slug}`
    );
  }
  getViideos(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + VIDEOS);
  }

  serach(slug: string, type: any): Observable<any> {
    return this.httpClient.get(
      `${environment.apiBaseUrl}${SEARCH}${slug}?type=${type}`
    );
  }
  // getVideos(type: string): Observable<any> {
  //   const url = `${environment.apiBaseUrl}${VIDEOS}?type=${type}`;
  //   return this.httpClient.get(url);
  // }

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
