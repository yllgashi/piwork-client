import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-information-item',
  templateUrl: './information-item.component.html',
  styleUrls: ['./information-item.component.scss'],
})
export class InformationItemComponent implements OnInit {
  @Input('text') text: string;
  @Input('icon') icon: string;
  @Input('iconColor') iconColor: string;

  constructor() { }

  ngOnInit() {}

}
