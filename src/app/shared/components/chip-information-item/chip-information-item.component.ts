import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chip-information-item',
  templateUrl: './chip-information-item.component.html',
  styleUrls: ['./chip-information-item.component.scss'],
})
export class ChipInformationItemComponent implements OnInit {
  @Input('icon') icon: string;
  @Input('chipLabel') chipLabel: string;
  @Input('chipBorderColor') chipBorderColor: string;

  constructor() {}

  ngOnInit() {}
}
