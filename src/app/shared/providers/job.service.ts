import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';
import { Job } from '../model/job.model';
import { JobDetails } from '../model/job-details.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private httpService: HttpService) {}

  getAllJobs(): Observable<Job[]> {
    const path = 'jobs';
    return this.httpService.get<Job[]>({ path });
  }

  getJobDetails(id: string): Observable<JobDetails> {
    const path = `jobs/${id}`;
    return this.httpService.get<JobDetails>({ path });
  }
}
