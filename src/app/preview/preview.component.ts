import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyCardComponent } from '../survey-card/survey-card.component';
import { FetchService } from '../services/fetch/fetch.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, SurveyCardComponent, ReactiveFormsModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent {
  surveyData: any;
  surveyForm: any;

  constructor(
    private fetchService: FetchService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.surveyData = history.state.survey;
    this.surveyData.questions.forEach((question: any, index: number) => {
      question.question_num = index + 1;
    });

    let formControls: { [key: string]: FormControl } = {};

    this.surveyData.questions.forEach((q: any) => {
      if (q.inputType === 'checkbox') {
        formControls['question' + q.question_num] = new FormControl([]);
      } else {
        formControls['question' + q.question_num] = new FormControl('');
      }
    });

    this.surveyForm = this.formBuilder.group(formControls);

  }

  getFormControl(index: string): FormControl {
    return this.surveyForm.controls[index] as FormControl;
  }

  createSurvey() {
    console.log(this.surveyData);
    this.fetchService.createSurvey(this.surveyData).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['admin/']);
    });
  }
}
