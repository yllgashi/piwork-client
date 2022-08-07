import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
})
export class DatetimePickerComponent implements OnInit {
  @Input('control') control: FormControl;
  @Input('label') label: string;
  @Input('startTime') startTime: string;
  @Input('icon') icon: string;
  constructor() {}

  ngOnInit() {}
}
