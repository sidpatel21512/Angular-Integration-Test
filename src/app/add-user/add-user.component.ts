import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  firstName = '';
  lastName = '';
  fullName = '';

  constructor(private router: Router, private userService: UserService) {

  }

  ngOnInit(): void {
  }

  setFullName() {
    this.fullName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1) +
    ' ' + this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1);
    this.fullName = this.fullName.trim();
  }

  addUser() {
    this.userService.addUser({
      firstname: this.firstName,
      lastname: this.lastName,
      fullname: this.fullName,
    });
    this.reset();
    this.router.navigate(['list']);
  }

  reset() {
    this.firstName = '';
    this.lastName = '';
    this.fullName = '';
  }

}
