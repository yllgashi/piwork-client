import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-picture',
  templateUrl: './header-picture.component.html',
  styleUrls: ['./header-picture.component.scss'],
})
export class HeaderPictureComponent implements OnInit {
  @Input('picture') picture: string;

  constructor() {}

  ngOnInit() {}

  get fileBaseUrl(): string {
    return environment.filesUrl;
  }
}
