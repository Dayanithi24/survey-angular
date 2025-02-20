import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { Router, RouterLink } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-survey',
  standalone: true,
  imports: [CommonModule, QuestionCardComponent, RouterLink, ReactiveFormsModule], 
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.css'
})
export class CreateSurveyComponent {

  @ViewChild('preview') preview!: ElementRef;
  private formBuilder = inject(FormBuilder);

  surveyData = this.formBuilder.group({
    title: [''],
    description: [''],
    questions: this.formBuilder.array([])
  });

  constructor(private router: Router) {}
 
  ngOnInit(){
    this.addQuestion();
  }

  get questions(): FormArray {
    return this.surveyData.get('questions') as FormArray;
  }

  getQuestion(index: number): FormGroup {
    return this.questions.controls[index] as FormGroup;
  }

  addQuestion() {
    const question = this.formBuilder.group({
      question: [''],
      inputType: ['multiple choice'],
      support_message: [''],
      error_message: [''],
      required: [false],
      options: this.formBuilder.array([''])
    });

    question.get('inputType')?.valueChanges.subscribe(inputType => {
      this.updateQuestion(question, inputType);
    })

    this.questions.push(question);
  }

  private updateQuestion(question: FormGroup, inputType: string | null){

    ['options', 'maximum_value', 'minimum_value', 'file_formats', 'maximum_number_of_files', 'maximum_file_size'].forEach(field => {
      if (question.contains(field)) {
        question.removeControl(field);
      }
    });

    switch (inputType) {
      case 'multiple choice':
      case 'checkbox':
        question.addControl('options', this.formBuilder.array(['']));
        break;

      case 'text':
      case 'number':
        question.addControl('minimum_value', new FormControl(''));
        question.addControl('maximum_value', new FormControl(''));
        break;

      case 'file':
        question.addControl('file_formats', new FormControl(''));
        question.addControl('maximum_number_of_files', new FormControl(1));
        question.addControl('maximum_file_size', new FormControl(''));
        break;

      default:
        break;
    }
  }

  onClickDiscard() {

    Swal.fire({
      title: 'Sure?',
      text: 'Do you want to discard?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Discard',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['admin/']);
      }
    });
  }

  removeQuestion(index: number) {
    Swal.fire({
      title: 'Sure?',
      text: 'Do you want to delete the question?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.questions.length > 1)
        {
          this.questions.removeAt(index);
          Swal.fire({
            title: "Deleted Successfully",
            icon: "success",
          });
        }
      }
    });
  }

  previewData(){
    this.router.navigate(['admin/preview'], {state: {survey: this.surveyData.value}});
  }
}
