import { Injectable } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { User } from '../user';
import { UserStore } from '../stores/user.store';

var users = JSON.parse(localStorage.getItem('ng2-users'));


@Injectable()
export class AuthService {
	constructor(
		private _router: Router 
	) {}

	logout() {
		localStorage.removeItem("loggedInUser");
		this._router.navigate(['Home']);
	}

	login(user) {
		var authUser = users.find(u => u.email === user.email);
		
		if(authUser && authUser.password == user.password) {
			localStorage.setItem("loggedInUser", JSON.stringify(authUser));
			this._router.navigate(['Dashboard']);
			return true;
		}
		return false;
	}

	checkCreds() {
		if(!this.isLoggedIn())
			this._router.navigate(['Login']);
	}

	/*
		Prevent Logged in users from accessing certain sites
	*/
	serviceRedirect() {
		//console.log('in service redirect');
		if(this.isLoggedIn()) {
			this._router.navigate(['Dashboard']);
		}
	}

	isLoggedIn() {
		var localUser = localStorage.getItem("loggedInUser");
		if(localStorage.getItem("loggedInUser") === null){
			return false;
		} else {
			return true;
		}

	}

}