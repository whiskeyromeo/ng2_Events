import { Component, ElementRef, ViewChild, Renderer, AfterViewInit } from '@angular/core';
import { NgForm, FormBuilder, Validators, ControlGroup, Control } from '@angular/common';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
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
		private _AuthService: AuthService,
		formBuilder: FormBuilder,
		renderer: Renderer
	) {

		this._AuthService.serviceRedirect();
		this.renderer = renderer;
		
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

	ngOnInit() {
		//this._AuthService.serviceRedirect();
	}

	ngAfterViewInit() {
		this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
	}

	login() {
		var user = {
			email: this.loginForm.value.email,
			password: this.loginForm.value.password
		};
		
		if(!this._AuthService.login(user)) {
			this.errorMsg = 'Invalid username or password';
		} else {
			console.log('Welcome Back!')
		}
	}

}