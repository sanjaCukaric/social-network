import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from './users.service';
import { User } from './user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, OnDestroy {

  user: User;
  userID: number;
  users: User[];
  filteredFriends: User[];
  private usersUpdated: Subscription;
  suggestion = false;

  constructor(public usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers();
    this.usersUpdated = this.usersService.usersUpdated
      .subscribe((users: User[]) => this.users = users);
  }

  ngOnDestroy() {
    this.usersUpdated.unsubscribe();
  }

  onSubmit(form: NgForm) {
    this.userID = form.value.user.id;
    this.user = this.usersService.getUser(this.userID);
    this.filteredFriends = [];
    this.suggestion = false;
  }

  findFriends() {
    this.filteredFriends = this.usersService.findFriends(this.userID);
  }

  findFriendsOfFriends() {
    this.filteredFriends = this.usersService.findFriendsOfFriends(this.userID);
  }

  suggestedFriends() {
    this.filteredFriends = this.usersService.suggestFriends(this.userID);
    this.suggestion = true;
  }
}

