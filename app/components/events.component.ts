import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, Validators, Control,  ControlGroup } from '@angular/common';
import { EventStore, Event } from '../stores/events.store';
import { ControlMessages } from '../control-messages';
import { ValidationService } from '../services/validation.service';
import { TimepickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import * as moment from 'moment';

@Component({
	selector: 'event-form',
	templateUrl: 'app/templates/events.component.html',
	directives: [TimepickerComponent, ControlMessages]
})

export class EventComponent { 
	formBuilder: FormBuilder;
	eventStore: EventStore;
	eventForm: ControlGroup;
	startTime = new Date();
	eventTypes = [
		'Birthday Party', 'Wedding', 'Hootenanny','Gathering', 'Shindig', 'Other'
	]

	constructor(
		formBuilder: FormBuilder,
		store: EventStore, 
		private _elRef: ElementRef
	) {
		this.formBuilder = formBuilder;
		this.buildEventForm();
		this.eventStore = store;


		this.eventForm.valueChanges.subscribe(data => console.log('form changes', data))

	}

	buildEventForm(): void {

		this.eventForm = this.formBuilder.group({
			'newEvent': ['', Validators.required],
			'eType': [''],
			'eDesc': [''],
			'startTime': [''],
			'startDate': [''],
			'endDate': ['']
		})
	}

	addEvent() {
		if (this.eventForm.dirty && this.eventForm.valid) {
			
			console.log('startTime:', this.startTime);

			this.eventStore.addEvent(
				this.eventForm.value.newEvent,
				this.eventForm.value.eType,
				this.eventForm.value.eDesc
			)
			
			this.buildEventForm();
		}
	}

	removeEvent(event: Event) {
		this.eventStore.removeEvent(event);
	}

	checkValue() {
		console.log('Event Change');
	}


	checked(id: string) {
		if(document.getElementById(id).checked==true){
			this.shown = true;
			console.log('checked');
		} else {
			this.shown = false;
		}
	}

	getDate() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		if (dd<10) {
			dd = '0' + dd
		}
		if (mm < 10) {
			mm = '0' + mm 
		}
		today = yyyy + '-' + mm + '-' + dd
		return today;
	}



}