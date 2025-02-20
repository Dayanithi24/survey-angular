import { Component, Input } from '@angular/core';
import { FetchService } from '../services/fetch/fetch.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './response.component.html',
  styleUrl: './response.component.css',
})
export class ResponseComponent {
  @Input() id!: string;
  page: number = 0;
  size: number = 5;
  minToDate: string = '';
  responseData: any;
  surveyData: any;
  dateForm!: FormGroup;

  constructor(private fetchService: FetchService, private formBuilder: FormBuilder) {
    this.dateForm = this.formBuilder.group({
      fromDate: [''],
      toDate: ['']
    });
  }

  ngOnInit() {
    this.surveyData = history.state.survey;
    this.fetchData();
  }

  fetchData() {
    this.fetchService
      .getResponsesOfSurvey(this.id, this.page, this.size, this.dateForm.get('fromDate')?.value, this.dateForm.get('toDate')?.value)
      .subscribe((data: any) => {
        this.responseData = data;
      });
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

  onSizeChange(event: Event) {
    this.size = (event.target as HTMLSelectElement).value as unknown as number;
    this.fetchData();
  }

  incrementPage() {
    if (!this.responseData.last) {
      this.page++;
      this.fetchData();
    }
  }

  decrementPage() {
    if (!this.responseData.first) {
      this.page--;
      this.fetchData();
    }
  }

  updateMinDate() {
    const from = this.dateForm.get('fromDate')?.value;
    if(from){
      this.minToDate = from;
      this.dateForm.get('toDate')?.setValue('');
    }
  }

  onSearch() {
    this.page = 0;
    if(this.dateForm.valid && this.dateForm.value.fromDate && this.dateForm.value.toDate) {
      this.fetchData();
    }
    
  }
  
  onReset() {
    this.dateForm.get('toDate')?.setValue('');
    this.dateForm.get('fromDate')?.setValue('');
    this.minToDate = '';
    this.page = 0;
    this.fetchData();
  }
}
