import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../model/skill.model';

import { HttpService } from './common/http.service';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  constructor(private httpService: HttpService) {}

  getAllSkills(): Observable<Skill[]> {
    const path = 'skills';
    return this.httpService.get<Skill[]>({ path });
  }
}
