import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';
import { CreateApplication } from '../model/create-application.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private httpService: HttpService) {}

  //   getAllJobs(): Observable<Job[]> {
  //     const path = 'applications';
  //     return this.httpService.get<Job[]>({ path });
  //   }

  createApplications(body: CreateApplication): Observable<any> {
    const path = 'applications';
    return this.httpService.post<any>({ path, body });
  }
}
