import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input('value') value: string;
  @Input('checked') checked: boolean;
  @Input('control') control: FormControl;
  @Output() onCheckOut = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {
    this.onCheckOrUncheck(this.checked);
  }

  onCheckOrUncheck(isChecked: boolean): void {
    this.checked = isChecked ? true : false; // in case isChecked is undefined
    this.onCheckOut.next(this.checked);
  }
}
