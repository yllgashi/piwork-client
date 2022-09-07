import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectModel } from 'src/app/shared/components/ion-components/select/select.model';
import { SearchJob } from 'src/app/shared/model/search-job.model';
import { Skill } from 'src/app/shared/model/skill.model';
import { SkillService } from 'src/app/shared/providers/skill.service';

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.scss'],
})
export class SearchJobsComponent implements OnInit {
  @Output() searchJobs$ = new EventEmitter<SearchJob>();
  searchJobsForm: FormGroup;
  skills: SelectModel[];
  areSkillsLoading: boolean;

  constructor(private skillService: SkillService) {}

  ngOnInit() {
    this.initializeForm();
    this.getSkills();
  }

  //#region form
  initializeForm(): void {
    this.searchJobsForm = new FormGroup({
      title: new FormControl(null),
      skillId: new FormControl(null),
    });
  }

  getControl(control: string): FormControl {
    return this.searchJobsForm.get(control) as FormControl;
  }
  //#endregion form

  getSkills(): void {
    this.onShowSkillsLoading();
    this.skillService.getAllSkills().subscribe({
      next: (res) => this.onGetSkillsRes(res),
      error: (e) => this.onGetSkillsError(e),
    });
  }

  onSubmit(): void {
    const { title, skillId } = this.getFormValues();
    this.onSearchJobs(title, +skillId);
  }

  onSearchJobs(title: string, skillId: number): void {
    const filter: SearchJob = this.initializeSearchJobModel(title, skillId);
    this.searchJobs$.next(filter);
  }

  //#region callbacks
  onGetSkillsRes(response: Skill[]): void {
    this.skills = response.map((e) => new SelectModel(e.id, e.name));
    this.onDismissSkillsLoading();
  }

  onGetSkillsError(error: string): void {
    this.onDismissSkillsLoading();
  }
  //#endregion callbacks

  //#region helpers
  getFormValues(): any {
    return this.searchJobsForm.value;
  }

  initializeSearchJobModel(title: string, skillId: number): SearchJob {
    const model: SearchJob = {
      skillId,
      title,
    };
    return model;
  }
  //#endregion helpers

  //#region loadings
  onShowSkillsLoading(): void {
    this.areSkillsLoading = true;
  }

  onDismissSkillsLoading(): void {
    this.areSkillsLoading = false;
  }
  //#endregion loadings
}
