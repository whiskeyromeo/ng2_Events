import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../user'; 
import { EventStore, Event } from '../stores/events.store';
import { Router } from '@angular/router-deprecated';
import * as moment from 'moment';

@Component({
	selector: 'Dashboard',
	templateUrl: 'app/templates/dashboard.component.html',
	styleUrls: ['static/css/dashboard.component.css'],
	providers: [AuthService]
})

export class DashboardComponent implements OnInit {
	currentUser: User;
	eventStore: EventStore

	constructor(
		private _router: Router,
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

	formatDate(date: string) {
		return new Date(date);
	}

	checkTime(time: string, time2:string) {
		time = this.formatDate(time);
		time2 = this.formatDate(time2);
		if(time2.getHours() > time.getHours()) {
			return true;
		} else if (time2.getMinutes() > time.getMinutes()) {
			return true;
		} else {
			return false;
		}
	}

	compareDates(date: string, date2:string) {
		date = this.formatDate(date);
		date2 = this.formatDate(date2);
		var result;
		if (date2.getMonth() > date.getMonth()) {
			result = true;
		} else if(date2.getDate() > date.getDate()) {
			result = true;
		} else {
			result = false;
		}
		return result;
	}

	removeEvent(event: Event) {
		this.eventStore.removeEvent(event);
	}

	goToDetail(event: Event) {
		let link = ['EventDetail', {id: event.id}];
		this._router.navigate(link);
	}

}