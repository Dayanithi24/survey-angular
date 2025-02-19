import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../services/profile/profile.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userName!: string;
  role: string = "user";

  constructor(private profileService: ProfileService) {}
  
  changeUser() {
    this.profileService.updateProfile(this.userName, this.role);
  }

}
