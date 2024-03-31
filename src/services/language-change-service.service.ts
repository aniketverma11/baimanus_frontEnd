import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageChangeServiceService {
  private languageChangeSubject = new Subject<void>();

  languageChange$ = this.languageChangeSubject.asObservable();

  emitLanguageChange(): void {
    this.languageChangeSubject.next();
  }
}
