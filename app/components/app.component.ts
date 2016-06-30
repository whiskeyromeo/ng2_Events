import { Component, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';
import { AddEventComponent } from './event-add.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard.component';
import { EventDetailComponent } from './event-detail.component';
import { EventEditComponent } from './event-edit.component';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'my-app',
	templateUrl: 'app/templates/app.component.html',
	styleUrls: ['static/css/app.component.css'],
	directives: [ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS, AuthService]
})

@RouteConfig([
	{
		path: '/home',
		name: 'Home',
		component: HomeComponent,
		useAsDefault: true
	},
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
		path: '/add-event',
		name: 'Todo',
		component: AddEventComponent
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: DashboardComponent
	},
	{
		path: '/event/detail/:id',
		name: 'EventDetail',
		component: EventDetailComponent
	},
	{
		path: '/event/edit/:id',
		name: 'EventEdit',
		component: EventEditComponent
	}
])

export class AppComponent {
	
	constructor(private _service: AuthService) {
	}

	isLoggedIn() {
		return this._service.isLoggedIn();
	}

	logout() {
		this._service.logout();
	}

 }