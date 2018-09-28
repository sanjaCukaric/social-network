import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users/users.service';
import { Subscription } from 'rxjs';
import { User } from './users/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private usersUpdated: Subscription;

  users: User[];

  constructor(public usersService: UsersService) { }

  ngOnInit() {
  }

}
