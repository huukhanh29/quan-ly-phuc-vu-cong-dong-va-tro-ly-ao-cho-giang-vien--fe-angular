import { Component } from '@angular/core';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent {
  loggedIn: boolean = false; // Initially, user is not logged in

  home() {
    // Implement your login logic here
    this.loggedIn = true;
  }

  logout() {
    // Implement your logout logic here
    this.loggedIn = false;
  }
}
