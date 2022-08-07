import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
})
export class SegmentComponent implements OnInit {
  initialValue: string;
  @Input('value') value: string;
  @Input('segments') segments: { value: string; label: string }[];
  @Output() onSegmentClick = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.value ? this.initializeValue() : this.initializeDefaultValue();
  }

  initializeValue(): void {
    const { value } = this.segments.find((x) => x.value === this.value);
    this.initialValue = value;
    this.onSegmentClick.next(value);
  }

  initializeDefaultValue(): void {
    const { value } = this.segments[0];
    this.initialValue = value;
    this.onSegmentClick.next(value);
  }

  onSegmentChanged(event: any): void {
    const { value } = event.detail;
    this.onSegmentClick.next(value);
  }
}
