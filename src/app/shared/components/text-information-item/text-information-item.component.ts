import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-information-item',
  templateUrl: './text-information-item.component.html',
  styleUrls: ['./text-information-item.component.scss'],
})
export class TextInformationItemComponent implements OnInit {
  @Input('title') title: string;
  @Input('subtitle') subtitle: string;
  @Input('rightNote') rightNote: string;
  @Input('icon') icon: string;
  @Output() itemClick$ = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onItemClick(): void {
    this.itemClick$.next();
  }
}
