import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FetchService } from '../services/fetch/fetch.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.css'
})
export class FormCardComponent {
  @Input() source: string = 'form1.png';
  @Input() surveyData: any;
  @Input() role!: string;

  @Output() delete = new EventEmitter<void>();

  constructor(private fetchService: FetchService) {}

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
  deleteSurvey(){
    this.fetchService.deleteSurvey(this.surveyData.id).subscribe((data: any) => {
      console.log(data);
      this.delete.emit();
    })
  }
}
