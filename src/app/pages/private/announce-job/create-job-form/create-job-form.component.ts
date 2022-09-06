import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertButton, AlertOptions } from '@ionic/angular';
import { JobCreate } from 'src/app/shared/model/create-job.model';
import { Skill } from 'src/app/shared/model/skill.model';
import { LanguagesService } from 'src/app/shared/providers/common/languages.service';
import { JobService } from 'src/app/shared/providers/job.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';

@Component({
  selector: 'app-create-job-form',
  templateUrl: './create-job-form.component.html',
  styleUrls: ['./create-job-form.component.scss'],
})
export class CreateJobFormComponent implements OnInit {
  @Input('skills') skills: Skill[];
  announceJobForm: FormGroup;
  choosedSkills: Skill[];
  createJobLoading: boolean;

  constructor(
    private jobService: JobService,
    private dynamicComponentsService: DynamicComponentsService,
    private languagesService: LanguagesService,
    private router: Router
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

  onSkillsSelect(event): void {
    const { value } = event.currentTarget;
    this.choosedSkills = value.map((x) => {
      const skill = this.skills.find((y) => y.id === x);
      return skill;
    });
  }

  isFormValid(): boolean {
    const validForm: boolean = this.announceJobForm.valid;
    if (!validForm) this.onShowError('ERROR.ERR_10');
    return validForm;
  }
  //#endregion form

  onSubmit(): void {
    const isValid = this.isFormValid();
    if (!isValid) return;
    const job: JobCreate = this.mapJobModel();
    this.onCreateJob(job);
  }

  onCreateJob(job: JobCreate): void {
    this.onShowLoading();
    this.jobService.createJob(job).subscribe({
      next: (res) => this.onCreateJobRes(res),
      error: (e) => this.onCreateJobError(e),
    });
  }

  //#region callbacks
  onCreateJobRes(response: any): void {
    this.onDismissLoading();
    this.router.navigate(['/jobs']);
    this.onShowSuccessAlert();
  }

  onCreateJobError(error: string): void {
    this.onDismissLoading();
    this.onShowError(error);
  }
  //#endregion callbacks

  //#region helpers
  mapJobModel(): JobCreate {
    const {
      title,
      description,
      sourceCodeLink,
      estimatedDays,
      contactEmail,
      priceAmount,
    } = this.announceJobForm.value;
    const skillsIds: number[] = this.choosedSkills.map((x) => x.id);
    const jobCreate: JobCreate = {
      title,
      description,
      sourceCodeLink,
      estimatedDays: +estimatedDays,
      priceAmount: +priceAmount,
      contactEmail,
      skillsIds,
    };
    return jobCreate;
  }

  onShowError(errorMsg: any): void {
    this.dynamicComponentsService.showTranslatedToast(errorMsg);
  }

  onShowSuccessAlert(): void {
    const header = 'Success';
    const subHeader =
      'Job has been created successfully. Now this job is open for job-seekers.';
    const text = this.languagesService.instant('APP.CANCEL');
    const buttons: AlertButton[] = [
      {
        text,
      },
    ];
    const options: AlertOptions = {
      header,
      subHeader,
      buttons,
    };
    this.dynamicComponentsService.showAlert(options);
  }
  //#endregion helpers

  //#region loadings
  onShowLoading(): void {
    this.createJobLoading = true;
  }

  onDismissLoading(): void {
    this.createJobLoading = false;
  }
  //#endregion loadings
}
