import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RadioModel } from './radio.model';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  @Input('data') data: RadioModel[];
  @Input('label') label: string;
  @Output() selectedOut = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    if (this.data && this.data.length > 0) this.onChange(this.data[0].id);
  }

  onChange(id: any): void {
    this.selectedOut.next(id);
  }
}
