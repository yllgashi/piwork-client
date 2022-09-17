import { Component, Input, OnInit } from '@angular/core';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { ChangeDescriptionComponent } from './change-description/change-description.component';

@Component({
  selector: 'app-name-and-description',
  templateUrl: './name-and-description.component.html',
  styleUrls: ['./name-and-description.component.scss'],
})
export class NameAndDescriptionComponent implements OnInit {
  @Input('firstName') firstName: string;
  @Input('lastName') lastName: string;
  @Input('description') description: string;
  @Input('isCurrentUser') isCurrentUser: boolean;

  constructor(private dcService: DynamicComponentsService) {}

  ngOnInit() {}

  onChangeDescription(): void {
    this.dcService.showModal({
      component: ChangeDescriptionComponent,
    });
  }
}
