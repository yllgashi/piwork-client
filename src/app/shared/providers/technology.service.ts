import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';
import { Technology } from '../model/technology.model';
import { Field } from '../model/field.model';

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  constructor(private httpService: HttpService) {}

  getAllTechnologies(): Observable<Technology[]> {
    const path = 'technology';
    return this.httpService.get<Technology[]>({ path });
  }

  getAllFields(): Observable<Field[]> {
    const path = 'technology/fields';
    return this.httpService.get<Field[]>({ path });
  }
}
