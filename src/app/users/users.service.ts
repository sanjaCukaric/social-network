import { User } from './user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UsersService {

    private users: User[] = [];
    usersUpdated = new Subject<User[]>();
    constructor(private http: HttpClient) {

    }

    getUsers() {
        return this.http.get<User[]>('../assets/data.json')
            .subscribe((data) => {
                this.users = data;
                this.usersUpdated.next([...this.users]);
            });
    }

    getUser(userID: number) {
        return this.users.find(e => e.id === userID);
    }

    findFriends(userID: number) {
        const user = this.getUser(userID);
        return user.friends.map(e => this.users.find(o => o.id === e));
    }

    findFriendsOfFriends(userID: number) {
        const myFriends = this.findFriends(userID);
        const myfriendsID = myFriends.map(e => e.id);
        const allFriendsID = [].concat(...myFriends.map(e => e.friends));
        const uniqueFriendsID = Array.from(new Set(allFriendsID));
        const differentFriendsID = uniqueFriendsID.filter(x => !myfriendsID.includes(x)).filter(e => e !== userID);
        return differentFriendsID.map(e => this.users.find(o => o.id === e));
    }

    suggestFriends(userID: number) {
        const myfriendsID = this.getUser(userID).friends;
        const friendsOfFriendsID = this.findFriendsOfFriends(userID).map(e => e.id);
        const sugestedFriends = friendsOfFriendsID.filter(e => Array.from(new Set(
            [...this.getUser(e).friends].filter(x => myfriendsID.includes(x)))).length >= 2);
        return sugestedFriends.map(e => this.users.find(o => o.id === e));
    }
}
