import { Component, ViewChild, Renderer, AfterViewInit } from '@angular/core';
import { NgForm, FormBuilder, Validators, ControlGroup, Control } from '@angular/common';
import { Router, ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { ControlMessages } from '../control-messages';
import { User } from '../user';
import { UserStore } from '../stores/user.store'
import { AuthService } from '../services/auth.service';
import { ValidationService } from '../services/validation.service'; 

@Component({
	selector: 'login',
	templateUrl: 'app/templates/login.component.html',
	directives: [ControlMessages, ROUTER_DIRECTIVES],
	providers: [AuthService, UserStore]
})

export class LoginComponent implements AfterViewInit{
	@ViewChild('email') input: ElementRef;

	renderer: Renderer;
	formBuilder: FormBuilder;
	active = true;
	submitted = false;
	public errorMsg = '';
	loginForm: any;


	constructor(
		private _service: AuthService,
		formBuilder: FormBuilder,
		public renderer: Renderer
	) {
		this.loginForm = formBuilder.group({
			email: ['', Validators.compose([Validators.required, ValidationService.validateEmail])],
			password: ['', Validators.required]
		})

		this.loginForm.valueChanges.subscribe(() => {
			if(this.errorMsg) {
				this.errorMsg = null;
			}
		})

	}

	ngAfterViewInit() {
		this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
	}

	login() {
		var user = {
			email: this.loginForm.value.email,
			password: this.loginForm.value.password
		};
		
		console.log(user)
		if(!this._service.login(user)) {
			this.errorMsg = 'Invalid username or password';
		} else {
			console.log('successful!')
		}
	}

}