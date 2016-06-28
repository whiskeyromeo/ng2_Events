import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';
import { Event } from '../stores/events.store'; 
import { User } from '../user';
import { RouteParams } from '@angular/router-deprecated';


@Component({
	selector: 'EventDetail',
	templateUrl: 'app/templates/event-detail.component.html',
	styleUrls: ['static/css/event-detail.component.css'],
	providers: [AuthService, EventService],
	inputs:['event']
})

export class EventDetailComponent implements OnInit{
	currentUser: User;
	event: Event;

	constructor(
		private	_AuthService: AuthService,
		private _routeParams: RouteParams,
		private _eventService: EventService
	) {
		this.currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
	}

	ngOnInit() {
		let id =  +this._routeParams.get('id');
		this._eventService.getEvent(id)
			.then(event => this.event = event);
	}
}