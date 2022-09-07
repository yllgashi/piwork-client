import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input('title') title: string;
  @Input('icon') icon: string;
  @Input('buttonsSlot') buttonsSlot: string;
  @Output() iconClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onIconClick(): void {
    this.iconClick.next();
  }
}
