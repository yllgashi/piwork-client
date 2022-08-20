import { Component, Input, OnInit } from '@angular/core';
import { Field } from 'src/app/shared/model/field.model';

@Component({
  selector: 'app-user-fields',
  templateUrl: './user-fields.component.html',
  styleUrls: ['./user-fields.component.scss'],
})
export class UserFieldsComponent implements OnInit {
  @Input('fields') fields: Field[];

  constructor() {}

  ngOnInit() {}
}
