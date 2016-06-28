import { Component, OnInit, ElementRef, ViewChild, Renderer, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, Control,  ControlGroup } from '@angular/common';
import { EventStore, Event } from '../stores/events.store';
import { ControlMessages } from '../control-messages';
import { ValidationService } from '../services/validation.service';
import { AuthService } from '../services/auth.service';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { CustomTimepickerComponent } from './customTimepicker.component';


@Component({
	selector: 'event-form',
	templateUrl: 'app/templates/events.component.html',
	styleUrls: ['static/css/event.component.css'],
	directives: [TimepickerComponent, CustomTimepickerComponent, ControlMessages]
})

export class EventComponent { 
	@ViewChild('title') input: ElementRef;
	endTimeChange: EventEmitter
	currentUser: User
	formBuilder: FormBuilder;
	eventStore: EventStore;
	eventForm: ControlGroup;
	startDate: Control;
	endDate: Control;
	shown = false;
	startTime = new Date();
	endTime = new Date();
	eventTypes = [
		'Birthday Party', 'Wedding', 'Hootenanny','Gathering', 'Shindig', 'Other'
	]

	constructor(
		formBuilder: FormBuilder,
		store: EventStore,
		public renderer: Renderer,
		private _elRef: ElementRef,
		private _service: AuthService
	) {

		this._service.checkCreds();

		this.currentUser = JSON.parse(localStorage.getItem('loggedInUser'))

		this.formBuilder = formBuilder;
		this.buildEventForm();
		this.eventStore = store;

	}

	ngAfterViewInit() {
		this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
	}

	buildEventForm(): void {

		this.startTime = new Date();
		this.endTime = new Date();

		this.eventForm = this.formBuilder.group({
			'newEvent': ['', Validators.required],
			'eType': [this.eventTypes[0]],
			'eDesc': [''],
			'startDate': ['', Validators.required],
			'endDate': [''],
			'startTime': [this.startTime, Validators.compose([Validators.required])],
			'endTime': [this.endTime],
			'guests': [''],
			'host': [this.currentUser.name, Validators.compose([ValidationService.checkString])]
		});

		//this.eventForm.valueChanges.subscribe(data => console.log('form changes', data));
		let startDateField = this.eventForm.controls['startDate'];
		startDateField.valueChanges.subscribe(() => {
			if (this.eventForm.value.startDate) {
				this.checkEndDate();
			}
		});

		this.eventForm.valueChanges.subscribe(() => {

		});
	}

	addEvent() {
		if (this.eventForm.dirty && this.eventForm.valid) {
			
			let start = this.prepareDate(this.eventForm.value.startDate, this.startTime);
			let end = this.prepareDate(this.eventForm.value.endDate, this.endTime);

			this.eventStore.addEvent(
				this.eventForm.value.newEvent,
				this.eventForm.value.eType,
				start,
				end,
				this.currentUser.id,
				this.eventForm.value.eDesc,
				this.eventForm.value.host
				this.eventForm.value.guests,
			)
			
			this.buildEventForm();
		}
	}

	removeEvent(event: Event) {
		this.eventStore.removeEvent(event);
	}

	checkEndDate() {
		let sDate = this.eventForm.value.startDate;
		let eDate = this.eventForm.value.endDate;
		if (eDate < sDate || this.eventForm.value.endDate === undefined) {
			this.eventForm.value.endDate = this.eventForm.value.startDate;
			this.endDate = this.eventForm.value.endDate;
		}
	}

	checkStartTime(endValue) {
		if(this.eventForm.value.startDate == this.eventForm.value.endDate) {
			if(this.startTime > this.endTime) {
				this.startTime = endValue;
			}
		}
	}

	checkEndTime(startValue) {
		if(this.eventForm.value.startDate == this.eventForm.value.endDate) {
			if(this.startTime > this.endTime) {
				this.endTime = startValue;
			}
		}
	}

	prepareDate(date: string, time: Date = ''){
		var newDate = new Date(date.replace(/-/g, '\/'));
		if (time) {
			var hours = time.getHours();
			var mins = time.getMinutes();
			newDate.setHours(hours, mins);
		}
		return newDate;
	}

	formatDate(date: string){
		var formatted = new Date(date);
		return formatted;
	}

	getDate() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		let todayConv = yyyy + '-' + mm + '-' + dd;
		return todayConv;
	}



}