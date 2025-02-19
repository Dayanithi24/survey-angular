import { Component } from '@angular/core';
import { SurveyCardComponent } from "../survey-card/survey-card.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../services/profile/profile.service';
import { FetchService } from '../services/fetch/fetch.service';

@Component({
  selector: 'app-generate-survey',
  standalone: true,
  imports: [SurveyCardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './generate-survey.component.html',
  styleUrl: './generate-survey.component.css'
})
export class GenerateSurveyComponent {
  surveyData: any;
  surveyForm!: FormGroup;
  user!: string;

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService, private fetchService: FetchService) {}

  ngOnInit(){
    this.surveyData = history.state.survey;

    this.profileService.currentUser.subscribe((profile: any) => {
      this.user = profile.name;
    })

    let formControls: { [key: string]: FormControl } = {};

    this.surveyData.questions.forEach((q: any) => {
      if (q.inputType === "checkbox") {
        formControls['question' + q.questionNum] = new FormControl([]);
      } else {
        formControls['question' + q.questionNum] = new FormControl('');
      }
    });

    this.surveyForm = this.formBuilder.group(formControls);

    console.log(this.surveyForm);
  }

  getFormControl(index: string): FormControl {
    return this.surveyForm.controls[index] as FormControl;
  }

  submitSurvey() {
    const response = {
      surveyId: this.surveyData.id,
      respondedBy: this.user,
      responses: this.surveyForm.value
    }
    this.fetchService.createResponse(response).subscribe((data: any) => {
      console.log(data);
    })
  }
}
