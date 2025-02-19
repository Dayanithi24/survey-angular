import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyCardComponent } from "../survey-card/survey-card.component";
import { FetchService } from '../services/fetch/fetch.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, SurveyCardComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  
  surveyData !: any;
  constructor(private fetchService: FetchService, private router: Router) {}

  ngOnInit() {
    this.surveyData = history.state.survey;
    this.surveyData.questions.forEach((question: any, index: number) => {
      question.question_num = index + 1;
    });
    console.log(this.surveyData);
  }

  createSurvey(){
    console.log(this.surveyData);
    this.fetchService.createSurvey(this.surveyData).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['admin/']);
    })
  }

}
