import {Component, OnInit} from '@angular/core';
import {User} from "./model/user.model";
import {AppService} from "./app.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: User[];
  addForm: FormGroup;

  constructor(private userService: AppService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
      });
  }

  onSubmit() {
    this.userService.createUser(this.addForm.value)
      .subscribe();
      this.users.push(this.addForm.value);
  }

  deleteUser(user) {
    this.userService.deleteUser(user.id)
      .subscribe(
        () => {
          this.getAllUsers();
        }
      );
  }
}
