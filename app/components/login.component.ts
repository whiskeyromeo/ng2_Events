import { Component } from '@angular/core';
import { NgForm } from '@angular/common';
import { User } from '../user';

@Component({
	selector: 'login',
	templateUrl: 'app/templates/login.component.html'
})

export class LoginComponent {
	active = true;
	submitted = false;

	model = new User(22, 'Boba Fett', 'EatCarbonite@slave1.com', 'pewpew')

	doLogin() {
		console.log('Logging In');
		this.submitted = true;
	}

	checkUser() {
		console.log('checking user');
		this active = false;
		setTimeout(() => this.active = true, 0);
	}
}