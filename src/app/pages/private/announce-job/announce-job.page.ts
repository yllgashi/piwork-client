import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { JobCreate } from 'src/app/shared/model/create-job.model';
import { Field } from 'src/app/shared/model/field.model';
import { Technology } from 'src/app/shared/model/technology.model';
import { JobService } from 'src/app/shared/providers/job.service';
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
  announceJobForm: FormGroup;
  choosedTechnologies: Technology[];
  choosedFields: Field[];
  areTechnologiesLoading: boolean;
  areFieldsLoading: boolean;
  createJobLoading: boolean;

  constructor(
    private technologyService: TechnologyService,
    private jobService: JobService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getTechnologies();
    setTimeout(() => {
      this.getFields();
    }, 1000);
  }

  initializeForm(): void {
    this.announceJobForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      sourceCodeLink: new FormControl(null, Validators.required),
      estimatedDays: new FormControl(null, Validators.required),
      contactEmail: new FormControl(null, Validators.required),
      priceAmount: new FormControl(null, Validators.required),
    });
  }

  getControl(control: string): FormControl {
    return this.announceJobForm.get(control) as FormControl;
  }

  onTechnologiesSelect(event): void {
    const { value } = event.currentTarget;
    this.choosedTechnologies = value.map((x) => {
      const technology = this.technologies.find((y) => y.id === x);
      return technology;
    });
  }

  onFieldsSelect(event): void {
    const { value } = event.currentTarget;
    this.choosedFields = value.map((x) => {
      const field = this.fields.find((y) => y.id === x);
      return field;
    });
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
    const job: JobCreate = this.mapJobModel();
    this.jobService.createJob(job).subscribe({
      next: (res) => this.onCreateJobRes(res),
      error: (e) => this.onCreateJobError(e),
    });
  }

  onCreateJobRes(response: any): void {
    this.onDismissCreateJobLoading();
  }

  onCreateJobError(response: any): void {
    this.onDismissCreateJobLoading();
  }

  mapJobModel(): JobCreate {
    const {
      title,
      description,
      sourceCodeLink,
      estimatedDays,
      contactEmail,
      priceAmount,
    } = this.announceJobForm.value;
    const technologiesIds: number[] = this.choosedTechnologies.map((x) => x.id);
    const fieldsIds: number[] = this.choosedFields.map((x) => x.id);
    const jobCreate: JobCreate = {
      title,
      description,
      sourceCodeLink,
      estimatedDays: +estimatedDays,
      priceAmount: +priceAmount,
      contactEmail,
      technologiesIds,
    };
    return jobCreate;
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
