import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user'; 
import { EventStore } from '../stores/events.store';

@Component({
	selector: 'Dashboard',
	templateUrl: 'app/templates/dashboard.component.html',
	providers: [AuthService]
})

export class DashboardComponent implements OnInit {
	currentUser: User;
	eventStore: EventStore

	constructor(
		private _service: AuthService,
		eStore: EventStore
	) {
		this.currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
		this.eventStore = eStore;
		
	}

	ngOnInit() {
		this._service.checkCreds();
	}

	logout() {
		this._service.logout();
	}

}