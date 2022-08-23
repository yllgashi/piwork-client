import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';
import { Job } from '../model/job.model';
import { JobDetails } from '../model/job-details.model';
import { JobCreate } from '../model/create-job.model';
import { SearchJob } from '../model/search-job.model';
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

  getAnnouncedJobs(): Observable<Job[]> {
    const path = 'jobs/announced';
    return this.httpService.get<Job[]>({ path });
  }

  getJobDetails(id: string): Observable<JobDetails> {
    const path = `jobs/${id}`;
    return this.httpService.get<JobDetails>({ path });
  }

  createJob(body: JobCreate): Observable<any> {
    const path = 'jobs';
    return this.httpService.post<any>({ path, body });
  }

  onSearchJobs(searchJob: SearchJob): Observable<Job[]> {
    const { title, skillId } = searchJob;
    const path = 'jobs/filter';
    const params = new HttpParams()
      .append('title', title)
      .append('skillId', skillId);
    return this.httpService.get<Job[]>({ path, params });
  }
}
