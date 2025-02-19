import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FetchService } from '../services/fetch/fetch.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.css'
})
export class FormCardComponent {
  @Input() source: string = 'form1.png';
  @Input() surveyData: any;
  @Input() role!: string;

  @Output() delete = new EventEmitter<void>();

  constructor(private fetchService: FetchService, private router: Router) {}

  changeStatus(isActive: boolean){
    if(isActive){
      this.fetchService.deActivateSurvey(this.surveyData.id).subscribe((data: any) => {
        this.surveyData = data;
      })
    }
    else{
      this.fetchService.activateSurvey(this.surveyData.id).subscribe((data: any) => {
        this.surveyData = data;
      })
    }
  }

  loadResponse(id: string) {
    this.router.navigate([`admin/response/${id}`], {state: {survey: this.surveyData}});
  }

  loadSurvey(id: string) {
    this.router.navigate([`${this.role}/survey/${id}`], {state: {survey: this.surveyData}});
  }

  deleteSurvey(){
    this.fetchService.deleteSurvey(this.surveyData.id).subscribe((data: any) => {
      console.log(data);
      this.delete.emit();
    })
  }
}
