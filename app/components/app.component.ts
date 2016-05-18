import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';
import { EventComponent } from './events.component';

@Component({
	selector: 'my-app',
	templateUrl: 'app/templates/app.component.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [
		ROUTER_PROVIDERS
	]
})

@RouteConfig([
	{
		path: '/signup',
		name: 'Signup',
		component: SignupComponent
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginComponent
	},
	{
		path: '/todo',
		name: 'Todo',
		component: EventComponent
	}
])

export class AppComponent { }