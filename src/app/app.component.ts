import { Component, OnInit } from '@angular/core';
import { LanguagesService } from './shared/providers/common/languages.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private languagesService: LanguagesService) {}

  ngOnInit(): void {
    this.setDefaultLanguage();
  }

  setDefaultLanguage(): void {
    this.languagesService.changeLanguage('en');
  }
}
