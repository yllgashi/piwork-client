import { Injectable } from '@angular/core';
import { UserDetails } from '../model/user-details.model';
import { UserExperience } from '../model/user-experience.model';
import { UserField } from '../model/user-fields.model';
import { UserJob } from '../model/user-job.model';
import { UserTechnology } from '../model/user-technology.model';

import { HttpService } from './common/http.service';

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
    return this.httpService.get<UserExperience[]>({ path });
  }

  getUserFields(userId: number) {
    const path = `account/${userId}/fields`;
    return this.httpService.get<UserField[]>({ path });
  }

  getUserTechnologies(userId: number) {
    const path = `account/${userId}/technologies`;
    return this.httpService.get<UserTechnology[]>({ path });
  }

  getUserJobs(userId: number) {
    const path = `account/${userId}/jobs`;
    return this.httpService.get<UserJob[]>({ path });
  }
}
