import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FetchService } from '../services/fetch/fetch.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.css',
})
export class FormCardComponent {
  @Input() source: string = 'form1.png';
  @Input() surveyData: any;
  @Input() role!: string;

  @Output() delete = new EventEmitter<void>();

  constructor(private fetchService: FetchService, private router: Router) {}

  changeStatus(isActive: boolean) {
    if (isActive) {
      this.fetchService
        .deActivateSurvey(this.surveyData.id)
        .subscribe((data: any) => {
          this.surveyData = data;
        });
    } else {
      this.fetchService
        .activateSurvey(this.surveyData.id)
        .subscribe((data: any) => {
          this.surveyData = data;
        });
    }
  }

  loadResponse(id: string) {
    this.router.navigate([`admin/response/${id}`], {
      state: { survey: this.surveyData },
    });
  }

  loadSurvey(id: string) {
    this.router.navigate([`${this.role}/survey/${id}`], {
      state: { survey: this.surveyData },
    });
  }

  deleteSurvey() {
    Swal.fire({
      title: 'Sure?',
      text: 'If you delete the survey, its responses will also be deleted..',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.fetchService.deleteSurvey(this.surveyData.id)
        .subscribe((data: any) => {
          if(data === 'Deleted Successfully!!'){
            this.fetchService.deleteResponsesOfSurvey(this.surveyData.id)
            .subscribe((data: any) => {
              if(data === 'Deleted Successfully!!'){
                Swal.fire({
                  title: 'Deleted Successfully!!',
                  icon: 'success',
                });
                this.delete.emit();
              }
            });
           
          }
        });
      }
    });
  }
}
