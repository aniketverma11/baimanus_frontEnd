import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<any> {
    // Correct the method name
    return this.httpClient
      .get(environment.apiBaseUrl + 'categories/')
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: {
    error: {
      message: string; // Correct the property name
    };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message; // Correct the property name
    } else {
      errorMessage = `${error.error.message}`; // Correct the property name
    }
    console.log(error);
    return throwError(errorMessage);
  }
}
