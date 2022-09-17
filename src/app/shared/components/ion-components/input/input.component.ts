import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input('control') control: FormControl;
  @Input('type') type: string;
  @Input('value') value: string;
  @Input('placeholder') placeholder: string;
  @Input('startIcon') startIcon: string;
  @Input('endIcon') endIcon: string;
  @Input('label') label: string;
  @Input('labelPosition') labelPosition: string;
  @Output() inputedTextOut = new EventEmitter<string>();
  @Output() endIconClickOut = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  outputInputText(event: KeyboardEvent): void {
    this.inputedTextOut.emit((event.target as HTMLInputElement).value);
  }

  onEndIconClick(): void {
    this.endIconClickOut.next();
  }
}
