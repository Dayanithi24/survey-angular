import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userName!: string;
  role: string = "user";

  constructor(private profileService: ProfileService, private router: Router) {}
  
  changeUser() {
    this.profileService.updateProfile(this.userName, this.role);
    if(this.userName === undefined || this.userName === '')
      Swal.fire("Error","Username shouldn't be Empty!","error");
    else {
      Swal.fire("Login Successful","","success")
      .then(() => {
          this.router.navigate([`${this.role}/`])
      })
    }
  }

}
