import { Component } from '@angular/core';
import { SurveyCardComponent } from "../survey-card/survey-card.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile/profile.service';
import { FetchService } from '../services/fetch/fetch.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

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
  role!: string;
  subscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder, 
    private profileService: ProfileService,
    private fetchService: FetchService,
    private router: Router
  ) {}

  ngOnInit(){
    this.surveyData = history.state.survey;

    this.subscription = this.profileService.currentUser.subscribe((profile: any) => {
      this.user = profile.name;
      this.role = profile.role;
    })

    let formControls: { [key: string]: FormControl } = {};

    this.surveyData.questions.forEach((q: any) => {
      if (q.inputType === "checkbox") {
        formControls['question' + q.questionNum] = new FormControl([]);
      } else {
        // const validators = [];
        // if(q.required) validators.push(Validators.required);
        // if(q.inputType === 'text') {
        //   validators.push(Validators.maxLength(q.maximumLength));
        //   validators.push(Validators.minLength(q.minimumLength));
        // }
        // else if(q.inputType === 'number') {
        //   validators.push(Validators.max(q.maximumValue));
        //   validators.push(Validators.min(q.minimumValue));
        // }
        formControls['question' + q.questionNum] = new FormControl('');
      }
    });

    this.surveyForm = this.formBuilder.group(formControls);
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
      this.router.navigate([`${this.role}/`]);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  confirmReset(event: Event) {
    event.preventDefault(); 
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reset the form?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reset it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.surveyForm.reset(); 
      }
    });
  }

  confirmSubmit() {
    if (this.surveyForm.invalid) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please fill in all required fields correctly.',
        icon: 'error',
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to submit the form?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitSurvey();
        Swal.fire({
          title: 'Submitted Successfully!!',
          icon: 'success',
        });
      }
    });
  }
}
