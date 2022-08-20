import { Component, OnInit } from '@angular/core';
import { Field } from 'src/app/shared/model/field.model';
import { Technology } from 'src/app/shared/model/technology.model';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { TechnologyService } from 'src/app/shared/providers/technology.service';

@Component({
  selector: 'app-announce-job',
  templateUrl: './announce-job.page.html',
  styleUrls: ['./announce-job.page.scss'],
})
export class AnnounceJobPage implements OnInit {
  technologies: Technology[];
  fields: Field[];
  areTechnologiesLoading: boolean;
  areFieldsLoading: boolean;

  constructor(
    private technologyService: TechnologyService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {
    this.getTechnologies();
    setTimeout(() => {
      this.getFields();
    }, 1000);
  }

  getTechnologies(): void {
    this.onShowTechnologiesLoading();
    this.technologyService.getAllTechnologies().subscribe({
      next: (res) => this.onGetTechnologiesRes(res),
      error: (e) => this.onGetTechnologiesError(e),
    });
  }

  getFields(): void {
    this.onShowFieldsLoading();
    this.technologyService.getAllFields().subscribe({
      next: (res) => this.onGetFieldsRes(res),
      error: (e) => this.onGetFieldsError(e),
    });
  }

  //#region callbacks
  onGetTechnologiesRes(response: Technology[]): void {
    this.technologies = response;
    this.onDismissTechnologiesLoading();
  }

  onGetTechnologiesError(e: string): void {
    this.onDismissTechnologiesLoading();
  }

  onGetFieldsRes(response: Field[]): void {
    this.fields = response;
    this.onDismissFieldsLoading();
  }

  onGetFieldsError(e: string): void {
    this.onDismissFieldsLoading();
  }
  //#endregion callbacks

  //#region helpers
  onShowTechnologiesLoading(): void {
    this.areTechnologiesLoading = true;
  }

  onDismissTechnologiesLoading(): void {
    this.areTechnologiesLoading = false;
  }

  onShowFieldsLoading(): void {
    this.areFieldsLoading = true;
  }

  onDismissFieldsLoading(): void {
    this.areFieldsLoading = false;
  }

  onShowError(errorMsg: any): void {
    this.dynamicComponentsService.showTranslatedToast(errorMsg);
  }
  //#endregion helpers
}
