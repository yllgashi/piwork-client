import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input('cardSubtitle') cardSubtitle: string;
  @Input('cardTitle') cardTitle: string;
  @Input('cardHeader') cardHeader: boolean;
  @Input('cardContent') cardContent: boolean;
  constructor() {}

  ngOnInit() {}
}
