import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input('name') name: string;
  @Input('slot') slot: string;
  @Input('style') style: string;
  @Output() onIconClick = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {}

  onClick(): void {
    this.onIconClick.next();
  }
}
