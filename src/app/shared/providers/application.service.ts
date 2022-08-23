import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';
import { CreateApplication } from '../model/create-application.model';
import { GetJobApplication } from '../model/get-job-application.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private httpService: HttpService) {}

  getJobApplications(): Observable<GetJobApplication[]> {
    const path = `applications`;
    return this.httpService.get<GetJobApplication[]>({ path });
  }

  getAnnouncedJobs(): Observable<GetJobApplication[]> {
    const path = `applications/announced`;
    return this.httpService.get<GetJobApplication[]>({ path });
  }

  getJobApplicationDetails(
    applicationId: number
  ): Observable<GetJobApplication> {
    const path = `applications/${applicationId}`;
    return this.httpService.get<GetJobApplication>({ path });
  }

  createApplication(body: CreateApplication): Observable<any> {
    const path = 'applications';
    return this.httpService.post<any>({ path, body });
  }

  deleteApplication(applicationId: number): Observable<any> {
    const path = `applications/${applicationId}`;
    return this.httpService.delete<any>({ path });
  }
}
