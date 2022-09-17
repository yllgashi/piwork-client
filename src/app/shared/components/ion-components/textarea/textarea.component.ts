import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent implements OnInit {
  @Input('description') description: string;
  @Input('control') control: FormControl;
  @Input('placeholder') placeholder: string;
  @Input('startIcon') startIcon: string;
  @Output('onKeyOut') onKeyOut = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  outputInputText(event: KeyboardEvent): void {
    this.onKeyOut.emit((event.target as HTMLInputElement).value);
  }
}
