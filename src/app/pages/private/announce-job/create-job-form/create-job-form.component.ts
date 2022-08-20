import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobCreate } from 'src/app/shared/model/create-job.model';
import { Field } from 'src/app/shared/model/field.model';
import { Technology } from 'src/app/shared/model/technology.model';
import { JobService } from 'src/app/shared/providers/job.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';

@Component({
  selector: 'app-create-job-form',
  templateUrl: './create-job-form.component.html',
  styleUrls: ['./create-job-form.component.scss'],
})
export class CreateJobFormComponent implements OnInit {
  @Input('technologies') technologies: Technology[];
  @Input('fields') fields: Field[];
  announceJobForm: FormGroup;
  choosedTechnologies: Technology[];
  choosedFields: Field[];
  createJobLoading: boolean;

  constructor(
    private jobService: JobService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  //#region form
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
  //#endregion form

  onCreateJob(): void {
    this.onShowCreateJobLoading();
    const job: JobCreate = this.mapJobModel();
    this.jobService.createJob(job).subscribe({
      next: (res) => this.onCreateJobRes(res),
      error: (e) => this.onCreateJobError(e),
    });
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

  //#region callbacks
  onCreateJobRes(response: any): void {
    this.onDismissCreateJobLoading();
  }

  onCreateJobError(response: any): void {
    this.onDismissCreateJobLoading();
  }
  //#endregion callbacks

  //#region loadings
  onShowCreateJobLoading(): void {
    this.createJobLoading = true;
  }

  onDismissCreateJobLoading(): void {
    this.createJobLoading = false;
  }
  //#endregion loadings

  //#region helpers
  onShowError(errorMsg: any): void {
    this.dynamicComponentsService.showTranslatedToast(errorMsg);
  }
  //#endregion helpers
}
