import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface UserProfile {
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileSubject: BehaviorSubject<UserProfile>;
  currentUser: Observable<UserProfile>;

  constructor() {
    // Initialize with default values
    this.profileSubject = new BehaviorSubject<UserProfile>({ name: '', role: '' });
    this.currentUser = this.profileSubject.asObservable();
  }

  updateProfile(name: string, role: string) {
    const updatedProfile: UserProfile = { name, role };
    this.profileSubject.next(updatedProfile);
  }
}
