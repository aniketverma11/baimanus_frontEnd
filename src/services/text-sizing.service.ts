import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextSizingService {
  private textSizeSubject = new BehaviorSubject<string>('medium');
  textSize$ = this.textSizeSubject.asObservable();

  setTextSize(size: string) {
    this.textSizeSubject.next(size);
  }

  constructor() {}
}
