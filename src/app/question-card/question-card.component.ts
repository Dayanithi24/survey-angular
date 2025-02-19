import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventType } from '@angular/router';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css'
})
export class QuestionCardComponent {

  @Output() delete = new EventEmitter<void>();
  @Input() form!: FormGroup;  

  deleteCard() {
    this.delete.emit();
  }

  get options(): FormArray {
    return this.form.get('options') as FormArray;
  }

  addOption() {
    this.options.push(new FormControl(''));
  }

  removeOption(index: number) {
    if(this.options.length > 1)
      this.options.removeAt(index); 
  }

  getFileFormat(event: Event) {
    const element = event.target as HTMLInputElement;
    this.fileFormats = element.value;
  }

  get fileFormats(): string {
    try{
      return this.form.get('file_formats')?.value?.join(', '); 
    }
    catch(error){
      return '';
    } 
  }

  set fileFormats(value: string) {
    this.form.get('file_formats')?.setValue(value.split(',').map(f => f.trim())); 
  }
}
