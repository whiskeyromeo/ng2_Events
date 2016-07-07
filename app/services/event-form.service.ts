import { Injectable } from '@angular/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { ValidationService } from '../services/validation.service';
import { User } from '../user';
import { Event } from '../stores/events.store';
import { DateService } from './date.service';

@Injectable()
export class EventFormService {
	formBuilder: FormBuilder;
	dateService: DateService
	eventForm: ControlGroup;
	startTime: any;
	endTime: any;
	startDate: string;
	endDate: string;
	currentUser: User;
	eventTypes = [
		'Birthday Party', 'Wedding', 'Hootenanny', 'Gathering', 'Shindig', 'Other'
	]

	constructor(
		formBuilder: FormBuilder,
		DateService : DateService
	){
		this.currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
		this.formBuilder = formBuilder;
		this.dateService = DateService;

	}

	/*
		Build the event form, necessary to separate this in order
		to allow for clearing of the form upon submission. 
	*/
	buildEventForm(event: Event = null) {
		if(!event) {	
			this.startTime = new Date();
			this.endTime = new Date();

			this.eventForm =  this.formBuilder.group({
				'newEvent': ['', Validators.required],
				'eType': [this.eventTypes[0]],
				'eDesc': [''],
				'startDate': ['', Validators.compose([Validators.required, ValidationService.checkDate])],
				'endDate': ['', Validators.compose([Validators.required, ValidationService.checkDate])],
				'startTime': [this.startTime, Validators.compose([ValidationService.checkTime, Validators.required])],
				'endTime': [this.endTime, Validators.required],
				'address': ['', Validators.required],
				'guests': ['', Validators.required],
				'host': [this.currentUser.name, Validators.compose([Validators.required, ValidationService.checkString])]
			});
		} else {

			this.eventForm = this.formBuilder.group({
				'newEvent': [event.title, Validators.required],
				'eType': [event.type, Validators.required],
				'eDesc': [event.description],
				'startDate': [event.startDate, Validators.compose([Validators.required])],
				'endDate': [event.endDate, Validators.required],
				'startTime': [event.startDate, Validators.compose([Validators.required])],
				'endTime': [event.endDate, Validators.required],
				'address': [event.address, ValidationService.addressRequired],
				'guests': [event.guests, Validators.required],
				'host': [event.host, Validators.compose([ValidationService.checkString, Validators.required])]
			});
		}
		return this.eventForm;
	}

	updateAddress(event) {
		console.log(event);
		this.address = event;
		this.eventForm.value.address = event;
	}

	/*
		Check/set the startTime
	*/
	checkStartTime(endValue) {
		if (this.eventForm.value.startDate == this.eventForm.value.endDate) {
			if (this.startTime > this.endTime) {
				this.startTime = endValue;
			}
		}
	}

	/*
		Check/set the endTime
	*/
	checkEndTime(startValue) {
		if(isNaN(startValue){
			this.eventForm.value.startTime = undefined;
			console.log('invalid startValue');
		}
		if (this.eventForm.value.startDate == this.eventForm.value.endDate) {
			if (this.startTime > this.endTime) {
				this.endTime = startValue;
			}
		}
	}

	/* 
		Ensure the endDate is later than the startDate
	*/
	checkEndDate(startValue) {
		console.log('in checkEndDate')
		if (!this.endDate || this.endDate < this.startDate) {
			this.endDate = startValue;
		}
		//Must eventForm value must be set to validate.
		this.eventForm.value.startDate = startValue;
	}



}