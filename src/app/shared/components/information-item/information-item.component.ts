import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-information-item',
  templateUrl: './information-item.component.html',
  styleUrls: ['./information-item.component.scss'],
})
export class InformationItemComponent implements OnInit {
  @Input('text') text: string;
  @Input('icon') icon: string;
  @Input('clickable') clickable: boolean;
  @Input('iconColor') iconColor: string;
  @Output() clicked = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onItemClick(): void {
    this.clicked.next();
  }
}
