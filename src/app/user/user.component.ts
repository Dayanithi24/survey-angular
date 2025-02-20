import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormCardComponent } from '../form-card/form-card.component';
import { ProfileService } from '../services/profile/profile.service';
import { Subscription } from 'rxjs';
import { FetchService } from '../services/fetch/fetch.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, FormCardComponent, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  imgs: Array<string> = [
    'form1.png',
    'form2.webp',
    'form3.webp',
    'form4.webp',
    'form5.webp',
  ];
  constructor(
    private profileService: ProfileService,
    private fetchService: FetchService,
    private router: Router
  ) {}

  user!: string;
  role!: string;
  subscription!: Subscription;
  surveys: any;

  ngOnInit() {
    this.subscription = this.profileService.currentUser.subscribe(
      (profile) => {
        this.user = profile.name;
        this.role = profile.role;
      }
    );
    this.fetchService.getEnabledSurveys().subscribe((data: any) => {
      this.surveys = data;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClickLogout() {
      Swal.fire({
        title: 'Sure?',
        text: 'Do you want to logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Logout',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Logged Out Successfully",
            icon: "success",
          });
          this.router.navigate(['login/'])
        }
      });
    }
}
