import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../enviroments/environment';
import {
  GET_CAT_LIST,
  HOME_CONTENT,
  HOME_CONTENT_BY_CATE,
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
  // /category-articles
  categoryarticles(slug: any, type: string): Observable<any> {
    return this.httpClient.get(
      `${environment.apiBaseUrl}${GET_CAT_LIST}${slug}?type=${type}`
    );
  }
  getHomeContentBySlug(slug: any, type: string, cat: any): Observable<any> {
    return this.httpClient.get(
      `${environment.apiBaseUrl}${HOME_CONTENT_BY_CATE}${cat}/${slug}?type=${type}`
    );
  }
  getHomeContentBySlugCat(slug: any, type: string): Observable<any> {
    return this.httpClient.get(
      `${environment.apiBaseUrl}${HOME_CONTENT_BY_CATE}${slug}?type=${type}`
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
  getVideosDetails(slug: string, type: any): Observable<any> {
    return this.httpClient.get(
      `${environment.apiBaseUrl}${VIDEOS_DETAILS}${slug}?type=${type}`
    );
  }
  getViideos(type: any): Observable<any> {
    const url = `${environment.apiBaseUrl}${VIDEOS}?type=${type}`;
    return this.httpClient.get(url);
  }

  serach(q: string, type: any): Observable<any> {
    return this.httpClient.get(
      `${environment.apiBaseUrl}${SEARCH}${q}?type=${type}`
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
