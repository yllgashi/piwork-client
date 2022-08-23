import { Injectable } from '@angular/core';
import { UserDetails } from '../model/user-details.model';
import { Experience } from '../model/experience.model';
import { UserJob } from '../model/user-job.model';

import { HttpService } from './common/http.service';
import { CreateSkill } from '../model/create-skill.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpService: HttpService) {}

  getUserDetails(userId: number) {
    const path = `account/${userId}`;
    return this.httpService.get<UserDetails>({ path });
  }

  getUserExperience(userId: number) {
    const path = `account/${userId}/experience`;
    return this.httpService.get<Experience[]>({ path });
  }

  createUserExperience(body: Experience) {
    const path = 'account/experience';
    return this.httpService.post<any>({ path, body });
  }

  getUserJobs(userId: number) {
    const path = `account/${userId}/jobs`;
    return this.httpService.get<UserJob[]>({ path });
  }

  createUserSkill(body: CreateSkill) {
    const path = `account/skills`;
    return this.httpService.post<any>({ path, body });
  }
}
