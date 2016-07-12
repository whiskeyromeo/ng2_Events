import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
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
	styleUrls: ['static/css/min/app.component.css'],
	directives: [ROUTER_DIRECTIVES],
	providers: [AuthService],
	precompile: [DashboardComponent, EventDetailComponent, EventEditComponent, HomeComponent, LoginComponent, SignupComponent, AddEventComponent]
})

@RouteConfig([
	{
		path: '/home',
		name: 'Home',
		component: HomeComponent,
		useAsDefault: true,
		pathMatch: 'full'
	},
	{
		path: '/signup',
		name: 'Signup',
		component: SignupComponent,
		pathMatch: 'full'
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginComponent,
		pathMatch: 'full'
	},
	{
		path: '/add-event',
		name: 'Todo',
		component: AddEventComponent,
		pathMatch: 'full'
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: DashboardComponent,
		pathMatch: 'full'
	},
	{
		path: '/event/detail/:id',
		name: 'EventDetail',
		component: EventDetailComponent,
		pathMatch: 'full'
	},
	{
		path: '/event/edit/:id',
		name: 'EventEdit',
		component: EventEditComponent,
		pathMatch: 'full'
	}
])

export class AppComponent {
	
	constructor(@Inject(AuthService) private _service: AuthService) {
	}

	// ngAfterViewInit() {
	// 	let form = document.getElementsByTagName('form');
	// 	for(let i = 0; i < form.length; i++) {
	// 		form[i].addEventListener('invalid', function(e) {
	// 			e.preventDefault();	
	// 		}, true);
	// 	}
	// }

	isLoggedIn() {
		return this._service.isLoggedIn();
	}

	logout() {
		this._service.logout();
	}

 }