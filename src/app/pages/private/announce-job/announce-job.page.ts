import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  announceJobForm: FormGroup;
  areTechnologiesLoading: boolean;
  createJobLoading: boolean;

  constructor(
    private technologyService: TechnologyService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getTechnologies();
  }

  initializeForm(): void {
    this.announceJobForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      sourceCodeLink: new FormControl(null, Validators.required),
      estimatedDays: new FormControl(null, Validators.required),
      contactEmail: new FormControl(null, Validators.required),
      priceAmount: new FormControl(null, Validators.required),
      jobTechnologiesIds: new FormControl(null, Validators.required),
    });
  }

  getControl(control: string): FormControl {
    return this.announceJobForm.get(control) as FormControl;
  }

  onSubmit(): void {
    const isValid = this.isFormValid();
    if (!isValid) return;
    this.onCreateJob();
  }

  isFormValid(): boolean {
    const validForm: boolean = this.announceJobForm.valid;
    if (!validForm) this.onShowError('ERROR.ERR_10');
    return validForm;
  }

  onCreateJob(): void {
    this.onShowCreateJobLoading();
  }

  getTechnologies(): void {
    this.onShowTechnologiesLoading();
    this.technologyService.getAllTechnologies().subscribe({
      next: (res) => this.onGetTechnologiesRes(res),
      error: (e) => this.onGetTechnologiesError(e),
    });
  }

  onGetTechnologiesRes(response: Technology[]): void {
    this.technologies = response;
    this.onDismissTechnologiesLoading();
  }

  onGetTechnologiesError(e: string): void {
    this.onDismissTechnologiesLoading();
  }

  //#region helpers
  onShowTechnologiesLoading(): void {
    this.areTechnologiesLoading = true;
  }

  onDismissTechnologiesLoading(): void {
    this.areTechnologiesLoading = false;
  }

  onShowCreateJobLoading(): void {
    this.createJobLoading = true;
  }

  onDismissCreateJobLoading(): void {
    this.createJobLoading = false;
  }

  onShowError(errorMsg: any): void {
    this.onDismissCreateJobLoading();
    this.dynamicComponentsService.showTranslatedToast(errorMsg);
  }
  //#endregion helpers
}
