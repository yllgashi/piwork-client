import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  currentLang: string;
  currentLang$ = new BehaviorSubject<string>(null);

  constructor(private translateService: TranslateService) {
    translateService.addLangs(['en', 'al']);
    this.initializeBehaviorSubject(translateService.currentLang);
  }

  changeLanguage(language: string): void {
    this.currentLang = language;
    this.translateService.use(language);
    this.initializeBehaviorSubject(language);
  }

  instant(key: string): any {
    return this.translateService.instant(key);
  }

  private initializeBehaviorSubject(value: string): void {
    this.currentLang$.next(value);
  }
}
