import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/shared/model/skill.model';
import { DynamicComponentsService } from 'src/app/shared/providers/native/dynamic-components.service';
import { SkillService } from 'src/app/shared/providers/skill.service';

@Component({
  selector: 'app-announce-job',
  templateUrl: './announce-job.page.html',
  styleUrls: ['./announce-job.page.scss'],
})
export class AnnounceJobPage implements OnInit {
  skills: Skill[];
  areSkillsLoading: boolean;

  constructor(
    private skillService: SkillService,
    private dynamicComponentsService: DynamicComponentsService
  ) {}

  ngOnInit() {
    this.getSkills();
  }

  getSkills(): void {
    this.onShowSkillsLoading();
    this.skillService.getAllSkills().subscribe({
      next: (res) => this.onGetSkillsRes(res),
      error: (e) => this.onGetSkillsError(e),
    });
  }

  //#region callbacks
  onGetSkillsRes(response: Skill[]): void {
    this.skills = response;
    this.onDismissSkillsLoading();
  }

  onGetSkillsError(e: string): void {
    this.onDismissSkillsLoading();
  }
  //#endregion callbacks

  //#region helpers
  onShowError(errorMsg: any): void {
    this.dynamicComponentsService.showTranslatedToast(errorMsg);
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
