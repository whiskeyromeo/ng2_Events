import { Component, ElementRef, ViewChild, Renderer, AfterViewInit } from '@angular/core';
import { NgForm, FormBuilder, Validators, Control, ControlGroup} from '@angular/common';
import { User } from '../user';
import { AuthService } from '../services/auth.service';
import { ControlMessages } from '../control-messages';
import { UserStore } from '../stores/user.store';
import { ValidationService } from '../services/validation.service';

@Component({
	selector: 'my-app',
	templateUrl: 'app/templates/signup.component.html',
	directives: [ControlMessages],
	providers: [AuthService, UserStore]
})

export class SignupComponent implements AfterViewInit{ 
	@ViewChild('name') input: ElementRef
	userStore : UserStore;
	userEmails: [];
	formBuilder = FormBuilder;
	active = true;
	submitted = false;
	signupForm: any;

	constructor(
		private _AuthService: AuthService,
		public renderer: Renderer,
		store : UserStore,
		formBuilder: FormBuilder
	) {
		this._AuthService.serviceRedirect();

		this.userStore = store
		this.userEmails = this.userStore.getUserEmails();

		this.signupForm = formBuilder.group({
			name: ['', Validators.compose([Validators.required, Validators.minLength(3), ValidationService.checkString])],
			email: ['', Validators.compose([Validators.required, ValidationService.validateEmail])],
			password: ['',Validators.compose([Validators.required, ValidationService.validatePassword])],
			passwordConf: ['', Validators.required],
			occupation: ['', Validators.compose([Validators.minLength(3), ValidationService.checkString])],
			state: ['', Validators.compose([Validators.minLength(3), ValidationService.checkString])],
			city: ['', Validators.compose([Validators.minLength(3), ValidationService.checkString])],
			zip: ['',ValidationService.checkZip]
		}, {
			validator: Validators.compose(
				[ValidationService.validateUnique('email', this.userEmails),
				 ValidationService.matchingPasswords('password', 'passwordConf')]
			)})

		//console.log(this.signupForm);

	
	}

	ngAfterViewInit() {
		this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
	}

	signup() {
		//console.log(this.signupForm.value);
		console.log('creating user...');
		this.userStore.addUser(
			this.signupForm.value.name,
			this.signupForm.value.email,
			this.signupForm.value.password,
			this.signupForm.value.occupation,
			this.signupForm.value.state,
			this.signupForm.value.city,
			this.signupForm.value.zip
		)
		this._AuthService.checkCreds();
	
	}

	newUser() {
		this.submitted = false;
	}

	checked(id: string) {
		var status = document.getElementById(id).checked
		if(status==true){
			this.shown = true;
			console.log('checked');
		} else {
			this.shown = false;
		}
	}

}