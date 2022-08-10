import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';
import { Job } from '../model/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private httpService: HttpService) {}

  getAllJobs(): Observable<Job[]> {
    const path = 'jobs';
    return this.httpService.get<any>({ path });
  }
}
