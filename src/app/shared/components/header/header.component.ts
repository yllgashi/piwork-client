import { Component, Input, OnInit } from '@angular/core';
import { DynamicComponentsService } from '../../providers/native/dynamic-components.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input('title') title: string;
  @Input('isModal') isModal: boolean;

  constructor(private dynamicComponentsService: DynamicComponentsService) {}

  ngOnInit() {}

  onDismissModal(): void {
    this.dynamicComponentsService.closeModal();
  }
}
