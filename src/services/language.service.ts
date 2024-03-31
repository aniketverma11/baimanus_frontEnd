import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageTypeSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('english');
  public languageType$: Observable<string> =
    this.languageTypeSubject.asObservable();

  constructor(private translate: TranslateService) {}

  setLanguage(language: string) {
    this.translate.use(language);
    this.languageTypeSubject.next(language);
  }

  getLanguageType(): string {
    return this.languageTypeSubject.value;
  }
}
