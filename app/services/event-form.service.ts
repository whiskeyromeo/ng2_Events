import { Injectable } from '@angular/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { ValidationService } from '../services/validation.service';
import { User } from '../user';
import { Event } from '../stores/events.store';
import { DateService } from './date.service';

@Injectable()
export class EventFormService {
	formBuilder: FormBuilder;
	dateService: DateService;
	prepDateTimeInput: any;
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
		this.prepDateTimeInput = DateService.prepDateTimeInput;

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
				'address': ['', Validators.required],
				'guests': ['', Validators.required],
				'host': [this.currentUser.name, Validators.compose([Validators.required, ValidationService.checkString])]
			}, {validator: ValidationService.compareDates('startDate', 'endDate')});
		} else {
			//console.log('event endDate: ', event.endDate);
			this.eventForm = this.formBuilder.group({
				'newEvent': [event.title, Validators.required],
				'eType': [event.type, Validators.required],
				'eDesc': [event.description],
				'startDate': [this.prepDateTimeInput(event.startDate), Validators.compose([Validators.required, ValidationService.checkDate])],
				'endDate': [this.prepDateTimeInput(event.endDate), Validators.compose([Validators.required, ValidationService.checkDate])],
				'address': [event.address, ValidationService.addressRequired],
				'guests': [event.guests, Validators.required],
				'host': [event.host, Validators.compose([ValidationService.checkString, Validators.required])]
			}, {validator: ValidationService.compareDates('startDate', 'endDate')});
		}
		return this.eventForm;
	}

	updateAddress(event) {
		//console.log(event);
		this.address = event;
		this.eventForm.value.address = event;
	}

	/*
		Check/set the startTime
	*/
	checkStartTime(endValue: any) {
		//console.log(this.eventForm.value.startDate);
		if(this.eventForm.value.endDate > this.eventForm.value.startDate) {
			console.log('endDate greater than startDate');
		}
	}

	/*
		Check/set the endTime
	*/
	checkEndTime(startValue: any) {
		if(isNaN(startValue)){
			this.eventForm.value.startTime = undefined;
			//console.log('invalid startValue');
		}
		if (this.eventForm.value.startDate == this.eventForm.value.endDate) {
			// if (this.startTime > this.endTime) {
			// 	this.endTime = startValue;
			// }
		}
	}

	/* 
		Ensure the endDate is later than the startDate
	*/
	checkEndDate(startValue: any) {
		console.log('endDate startValue', startValue)
		if (!this.endDate || this.endDate < this.startDate) {
			this.endDate = startValue;
		}
		//eventForm value must be set to validate.
		this.eventForm.value.startDate = startValue;
	}



}