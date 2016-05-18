import { Component } from '@angular/core';
import { NgForm } from '@angular/common';
import { User } from '../user';

@Component({
	selector: 'my-app',
	templateUrl: 'app/templates/signup.component.html'
})

export class SignupComponent { 
	active = true;
	submitted = false;

	model = new User(22, 'Han Solo', 'solo@luckyshot.com', 'bam')
	
	doSignup() {
		console.log('Form submitted!');
		this.submitted = true;
	}

	newUser() {
		this.submitted = false;
		this.model = new User(42, '', '','');
		this.active = false;
		setTimeout(() => this.active = true, 0);
	}


}