import { Component, Input } from '@angular/core';
import { FetchService } from '../services/fetch/fetch.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response.component.html',
  styleUrl: './response.component.css'
})
export class ResponseComponent {
  @Input() id!: string;
  page: number = 0;
  size: number = 5;
  from: string = '';
  to: string = '';
  responses: any;
  surveyData: any; 

  constructor(private fetchService: FetchService) {}

  ngOnInit() {
    this.surveyData = history.state.survey;
    this.fetchService.getResponsesOfSurvey(this.id, this.page, this.size, this.from, this.to).subscribe((data: any) => {
      this.responses = data;
      console.log(this.responses)
    })
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  
  formatResponse(value: any): string {
    if (Array.isArray(value)) {
      return value.join(', '); 
    } else if (typeof value === 'object' && value !== null) {
      return '-';
    }
    return value;
  }
  

}
