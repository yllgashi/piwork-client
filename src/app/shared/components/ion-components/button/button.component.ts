import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input('type') type: string;
  @Input('text') text: string;
  @Input('color') color: string;
  @Input('expand') expand: string;
  @Input('size') size: string;
  @Input('fill') fill: string;
  @Input('shape') shape: string;
  @Input('startIcon') startIcon: string;
  @Input('endIcon') endIcon: string;
  @Input('disabled') disabled: boolean;
  @Output() clickOut = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onClick(): void {
    this.clickOut.next();
  }
}
