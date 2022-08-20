import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-name-and-description',
  templateUrl: './name-and-description.component.html',
  styleUrls: ['./name-and-description.component.scss'],
})
export class NameAndDescriptionComponent implements OnInit {
  @Input('firstName') firstName: string;
  @Input('lastName') lastName: string;
  @Input('description') description: string;

  constructor() {}

  ngOnInit() {}
}
