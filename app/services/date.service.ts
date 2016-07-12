import { Injectable } from '@angular/core';

@Injectable()
export class DateService{

	constructor() {}

	formatDate(date: string) {
		return new Date(date);
	}

	checkTime(time: string, time2: string) {
		time = new Date(time);
		time2 = new Date(time2);
		if (time2.getHours() != time.getHours()) {
			return true;
		} else if (time2.getMinutes() != time.getMinutes()) {
			return true;
		} else {
			return false;
		}
	}

	compareDates(date: string, date2: string) {
		date = new Date(date);
		date2 = new Date(date2);
		var result;
		if (date2.getMonth() > date.getMonth()) {
			result = true;
		} else if (date2.getDate() > date.getDate()) {
			result = true;
		} else {
			result = false;
		}
		return result;
	}

	/* 
		Prepare the date for submission
		If not prepared as a Date object, the datepipe in
		angular2 cannot be applied to the created object. 
	*/
	prepareDate(date: string, time: any = '') {
		var newDate = new Date(date.replace(/-/g, '\/'));
		if (time) {
			var hours = time.getHours();
			var mins = time.getMinutes();
			newDate.setHours(hours, mins);
		}
		return newDate;
	}

	/*
		Prepare the date for the datepicker
	*/
	getDate(today: Date = new Date()) {
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

	/*
		Prepare a future date
	*/
	getMaxDate(today: Date = new Date()) {
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear() + 3;
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