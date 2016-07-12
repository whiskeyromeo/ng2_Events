import { Component, OnInit, ElementRef, ViewChild, Renderer, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, Control,  ControlGroup } from '@angular/common';
import { EventStore } from '../stores/events.store';
import { Event } from '../event';
import { ControlMessages } from '../control-messages';
import { ValidationService } from '../services/validation.service';
import { AuthService } from '../services/auth.service';
import { DateService } from '../services/date.service';
import { EventService } from '../services/event.service';
import { EventFormService } from '../services/event-form.service';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { Router, RouteParams } from '@angular/router-deprecated';

import { User } from '../user';

import { AddressComponent } from './address.component';

@Component({
	selector: 'event-form',
	templateUrl: 'app/templates/event-add.component.html',
	styleUrls: ['static/css/event.component.css'],
	directives: [TimepickerComponent, ControlMessages, AddressComponent],
	providers: [EventFormService, DateService, EventService]
})

export class AddEventComponent { 
	@ViewChild('title') input: ElementRef;
	address: any;
	addressControl: Control;
	currentUser: User;
	event: Event;
	formBuilder: FormBuilder;
	eventStore: EventStore;
	eventForm: ControlGroup;
	startDate: Control;
	endDate: Control;
	startTime = new Date();
	endTime = new Date();
	eventTypes = [
		'Birthday Party', 'Wedding', 'Hootenanny','Gathering', 'Shindig', 'Other'
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
		this.eventForm = this._EventFormService.buildEventForm();
		this.eventStore = store;

		this.prepareDate = this._DateService.prepareDate;
		this.getDate = this._DateService.getDate;
		this.getMaxDate = this._DateService.getMaxDate;
		
		this.checkStartTime = this._EventFormService.checkStartTime;
		this.checkEndTime = this._EventFormService.checkEndTime;
		this.checkEndDate = this._EventFormService.checkEndDate;
		this.updateAddress = this._EventFormService.updateAddress;
		// this.eventForm.valueChanges.subscribe((data) => {
		// 	console.log('data: ', data);
		// });

	}

	/*
		Autofocus the form after the view has been initialized.  
	*/
	ngAfterViewInit() {
		this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');

	}

	// updateAddress(event) {
	// 	console.log('inside checkEvent!', event);
	// 	this.address = event;
	// 	this.eventForm.value.address = event;
	// 	console.log('this.address: ' this.address);
	// }

	/*
		Add an event if values are valid and the form has been 
		touched
	*/
	addEvent() {
		if (this.eventForm.dirty && this.eventForm.valid) {
			
			let start = this.prepareDate(this.startDate, this.startTime);
			let end = this.prepareDate(this.endDate, this.endTime);
			console.log('address: ', this.address);
			this.eventStore.addEvent(
				this.eventForm.value.newEvent,
				this.eventForm.value.eType,
				start,
				end,
				this.currentUser.id,
				this.eventForm.value.eDesc,
				this.eventForm.value.host,
				this.address,
				this.eventForm.value.guests
			)
			
			this._router.navigate(['Dashboard']);
		}
	}

	/*
		Remove an event from the eventStore
	*/
	removeEvent(event: Event) {
		this.eventStore.removeEvent(event);
	}

	/*
		Rebuild/clear the form
	*/
	clearForm() {
		this.eventForm = this._EventFormService.buildEventForm();
	}




}