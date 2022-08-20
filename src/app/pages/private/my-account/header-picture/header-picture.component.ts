import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-picture',
  templateUrl: './header-picture.component.html',
  styleUrls: ['./header-picture.component.scss'],
})
export class HeaderPictureComponent implements OnInit {
  @Input('picture') picture: string;

  constructor() { }

  ngOnInit() {}

}
