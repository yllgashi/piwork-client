import { Component, Input, OnInit } from '@angular/core';
import { BrowserService } from 'src/app/shared/providers/browser.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-information',
  templateUrl: './job-information.component.html',
  styleUrls: ['./job-information.component.scss'],
})
export class JobInformationComponent implements OnInit {
  @Input('jobId') jobId: number;
  @Input('title') title: string;
  @Input('description') description: string;
  @Input('isActive') isActive: boolean;
  @Input('estimatedDays') estimatedDays: number;
  @Input('priceAmount') priceAmount: number;
  @Input('sourceCodeLink') sourceCodeLink: string;
  @Input('requiredSkills') requiredSkills: any;
  @Input('publishedByUserFirstName') publishedByUserFirstName: string;
  @Input('publishedByUserLastName') publishedByUserLastName: string;
  @Input('publisherPicture') publisherPicture: string;
  @Input('contactEmail') contactEmail: string;

  constructor(private browserService: BrowserService) {}

  ngOnInit() {}

  onSourceCodeClick(): void {
    this.browserService.open(this.sourceCodeLink).subscribe();
  }

  get fileBaseUrl(): string {
    return environment.filesUrl;
  }

  onPublisherClick(): void {}
}
