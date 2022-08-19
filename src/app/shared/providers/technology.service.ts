import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';
import { Technology } from '../model/technology.model';

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  constructor(private httpService: HttpService) {}

  getAllTechnologies(): Observable<Technology[]> {
    const path = 'technology';
    return this.httpService.get<Technology[]>({ path });
  }
}
