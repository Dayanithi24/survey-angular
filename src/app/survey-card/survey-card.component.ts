import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-survey-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-card.component.html',
  styleUrl: './survey-card.component.css'
})
export class SurveyCardComponent {
  @Input() question!: any;
  inputType!: string;

  ngOnInit() {
    this.inputType = this.question.inputType === 'multiple choice'? 'radio' : this.question.inputType;
  }
}
