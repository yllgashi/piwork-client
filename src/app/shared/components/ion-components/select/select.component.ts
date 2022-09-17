import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectModel } from './select.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input('control') control: FormControl;
  @Input('data') data: SelectModel[];
  @Input('description') description: string;
  @Input('color') color: string;
  @Input('icon') icon: string;
  @Output() onSelectOut = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.onSelect(this.data[0].id);
  }

  onSelect(id: any) {
    this.onSelectOut.next(id);
  }
}
