import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateSkill } from 'src/app/shared/model/create-skill.model';
import { Skill } from 'src/app/shared/model/skill.model';
import { AccountService } from 'src/app/shared/providers/account.service';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { SkillService } from 'src/app/shared/providers/skill.service';

@Component({
  selector: 'app-add-user-skill',
  templateUrl: './add-user-skill.component.html',
  styleUrls: ['./add-user-skill.component.scss'],
})
export class AddUserSkillComponent implements OnInit {
  form: FormGroup;
  skills: Skill[];
  isLoading: boolean;

  constructor(
    private accountService: AccountService,
    private skillService: SkillService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getAllSkills();
  }

  initializeForm(): void {
    this.form = new FormGroup({
      skillId: new FormControl(null, Validators.required),
    });
  }

  getControl(control: string): FormControl {
    return this.form.get(control) as FormControl;
  }

  getAllSkills(): void {
    this.skillService.getAllSkills().subscribe({
      next: (res) => this.onGetAllSkillsRes(res),
    });
  }

  onSubmit(): void {
    this.onShowLoading();
    const skill: CreateSkill = this.createSkillModel();
    this.createUserSkill(skill);
  }

  createSkillModel(): CreateSkill {
    const { skillId } = this.form.value;
    const skill: CreateSkill = {
      skillId,
    };
    return skill;
  }

  createUserSkill(skill: CreateSkill): void {
    this.accountService.createUserSkill(skill).subscribe({
      next: (res) => this.onCreateUserSkillRes(res),
      error: (e) => this.onCreateUserSkillError(e),
    });
  }

  //#region callbacks
  onGetAllSkillsRes(response: Skill[]): void {
    this.skills = response;
  }

  onCreateUserSkillRes(response: any): void {
    this.onDismissLoading();
    this.closeModal();
  }

  onCreateUserSkillError(error: string): void {
    this.onDismissLoading();
  }
  //#endregion callbacks

  //#region helpers
  closeModal(): void {
    this.dynamicComponentsService.closeModal();
  }
  //#endregion helpers

  //#region loadings
  onShowLoading(): void {
    this.isLoading = true;
  }

  onDismissLoading(): void {
    this.isLoading = false;
  }
  //#endregion loadings
}
