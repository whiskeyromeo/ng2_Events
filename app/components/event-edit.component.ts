import { Component, OnInit, ElementRef, ViewChild, Renderer, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, Control, ControlGroup } from '@angular/common';
import { EventStore, Event } from '../stores/events.store';
import { ControlMessages } from '../control-messages';
import { ValidationService } from '../services/validation.service';
import { AuthService } from '../services/auth.service';
import { DateService } from '../services/date.service';
import { EventService } from '../services/event.service';
import { EventFormService } from '../services/event-form.service';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { Router, RouteParams } from '@angular/router-deprecated';

import { User } from '../user';


@Component({
	selector: 'EventEdit',
	templateUrl: 'app/templates/event-edit.component.html',
	styleUrls: ['static/css/event.component.css'],
	directives: [TimepickerComponent, ControlMessages],
	providers: [EventFormService, DateService, EventService],
	inputs: ['event']
})

export class EventEditComponent implements OnInit {
	@ViewChild('title') input: ElementRef;
	currentUser: User;
	event: Event;
	formBuilder: FormBuilder;
	eventStore: EventStore;
	eventForm: ControlGroup;
	startDate: any;
	endDate: any;
	startTime: any;
	endTime: any;
	eventTypes = [
		'Birthday Party', 'Wedding', 'Hootenanny', 'Gathering', 'Shindig', 'Other'
	]

	prepareDate: any;
	getDate: any;
	checkStartTime: any;
	checkEndTime: any;
	checkEndDate: any;


	/*
		Construct the event form, populating the requisite 
		fields using the store and authenticate using the AuthService. 
	*/
	constructor(
		formBuilder: FormBuilder,
		store: EventStore,
		public renderer: Renderer,
		private _elRef: ElementRef,
		private _AuthService: AuthService,
		private _EventFormService: EventFormService,
		private _DateService: DateService,
		private _EventService: EventService,
		private _routeParams: RouteParams,
		private _router: Router
	) {

		this._AuthService.checkCreds();

		this.currentUser = JSON.parse(localStorage.getItem('loggedInUser'))

		this.formBuilder = formBuilder;
		
		this.eventStore = store;

		this.prepareDate = this._DateService.prepareDate;
		this.getDate = this._DateService.getDate;

		this.checkStartTime = this._EventFormService.checkStartTime;
		this.checkEndTime = this._EventFormService.checkEndTime;
		this.checkEndDate = this._EventFormService.checkEndDate;
	}

	ngOnInit() {
		let id = +this._routeParams.get('id');
		this.event = this._EventService.getEvent2(id)

		this.eventForm = this._EventFormService.buildEventForm(this.event);
		
		this.startTime = new Date(this.event.startDate);
		this.endTime = new Date(this.event.endDate);
		
		this.startDate = this._DateService.getDate(this.startTime);
		this.endDate = this._DateService.getDate(this.endTime);


	}

	/*
		Autofocus the form after the view has been initialized.  
	*/
	ngAfterViewInit() {
		this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
		
	}

	/*
		Add an event if values are valid and the form has been 
		touched
	*/
	updateEvent() {
		if (this.eventForm.valid) {

			let start = this.prepareDate(this.startDate, this.startTime);
			let end = this.prepareDate(this.endDate, this.endTime);

			var editedEvent = new Event(
				this.event.id,
				this.eventForm.value.newEvent,
				this.eventForm.value.eType,
				this.eventForm.value.eDesc,
				start,
				end,
				this.event.creatorId,
				this.eventForm.value.host,
				this.eventForm.value.guests
			);

			this.eventStore.updateEvent(editedEvent);

			this._router.navigate(['Dashboard']);
		}
	}

	/*
		Remove an event from the eventStore
	*/
	removeEvent(event: Event) {
		this.eventStore.removeEvent(event);
		this._router.navigate(['Dashboard']);
	}

	/*
		Rebuild/clear the form
	*/
	clearForm() {
		this.eventForm = this._EventFormService.buildEventForm();
	}




}