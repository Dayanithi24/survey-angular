import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-survey-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './survey-card.component.html',
  styleUrl: './survey-card.component.css'
})
export class SurveyCardComponent {
  @Input() question!: any;
  @Input() formCont!: FormControl;
  inputType!: string;
  questionNum!:number;
  
  ngOnInit() {
    this.inputType = this.question.inputType === 'multiple choice'? 'radio' : this.question.inputType;
    this.questionNum = this.question.question_num ?? this.question.questionNum;
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const fileName = target.files[0].name; 
      this.formCont.setValue(fileName);
    }
  }
  
  
  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    let currentValues = this.formCont.value || [];

    if (target.checked) {
      this.formCont.setValue([...currentValues, target.value]);
    } else {
      this.formCont.setValue(currentValues.filter((v: string) => v !== target.value));
    }
  }
}
