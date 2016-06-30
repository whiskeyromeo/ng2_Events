import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DateService } from '../services/date.service';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { User } from '../user'; 
import { EventStore, Event } from '../stores/events.store';
import * as moment from 'moment';

@Component({
	selector: 'Dashboard',
	templateUrl: 'app/templates/dashboard.component.html',
	styleUrls: ['static/css/dashboard.component.css'],
	directives: [ROUTER_DIRECTIVES],
	providers: [AuthService, DateService]
})

export class DashboardComponent implements OnInit {
	currentUser: User;
	eventStore: EventStore;
	compareDates: any;
	checkTime: any;
	formatDate: any;

	constructor(
		private _AuthService: AuthService,
		private _DateService: DateService,
		eStore: EventStore
	) {
		this.currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
		this.eventStore = eStore;
		this.compareDates = _DateService.compareDates;
		this.checkTime = _DateService.checkTime;
		this.formatDate = _DateService.formatDate;
	}

	ngOnInit() {
		this._AuthService.checkCreds();
	}

	removeEvent(event: Event) {
		this.eventStore.removeEvent(event);
	}

}