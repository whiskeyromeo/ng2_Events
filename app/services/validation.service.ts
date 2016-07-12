import { ControlGroup } from '@angular/common';
import { DateService } from '../services/date.service';
import { UserStore } from '../stores/user.store';

export class ValidationService {


	static getValidatorErrorMessage(code: string, quality: string) {
		let config = {
			'non-uniqueEmail' : 'Email already associated with an existing account',
			'addressRequired' : 'Location is required.',
			'required' : `${quality} is Required`,
			'minlength': `${quality} is too short.`,
			'invalidEmail': `Invalid Email address.`,
			'invalidPassword': `Password must be between 8 and 15 characters
				 and include at least one of each of the following:
				 Lowercase letter,
				 Uppercase letter,
				 Number.`,
			'invalidZip': `Zip must be 5 digits`,
			'invalidString': `${quality} is not valid.`,
			'invalidDate': `${quality} cannot be before the current date.`,
			'mismatchedPasswords': `Password and Confirm Password must match.`,
			'outOfDateRange': `${quality} must not be more than 3 years in the future.`
		}
		return config[code];
	}

	/*
		TODO: Figure out how to set error messages/validation 
		the child Timepicker component.
	*/
	static addressRequired(control) {
		if(control.value == '') {
			return { 'addressRequired': true }
		}
		return null;
	}

	static checkDate(control) {
		if (control.value) {
			let strInputVal = control.value;
			//Correct the Date bug in JS which causes datepicker 
			//generated Date values to be off by one day.
			strInputVal = strInputVal.split('-').join('/');
			let thisDate = new Date();
			thisDate.setHours(0, 0, 0, 0);
			let controlDate = new Date(strInputVal);
			if (controlDate < thisDate) {
				return { 'invalidDate': true }
			}
			if (controlDate.getFullYear() > thisDate.getFullYear() + 3) {
				return { 'outOfDateRange': true }
			}
		}
		return null;
	}

	static validateUnique(emailKey: string, array: any) {
		return (group : ControlGroup) => {
			let email = group.controls[emailKey];
			if(array.indexOf(email.value) > -1) {
				return email.setErrors({
					'non-uniqueEmail': true
				})
			}
		}
		//console.log(emailKey, array);

	}

	static validateEmail(control) {
		if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
	      return null;
		} else {
	        return { 'invalidEmail': true };
	    }
	}

	static validatePassword(control) {
		if(control.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)) {
			return null;
		} else {
			return { 'invalidPassword': true }
		}
	}

	static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
		return (group: ControlGroup) => {
			let password = group.controls[passwordKey];
			let passwordConf = group.controls[confirmPasswordKey];

			if(password.value !== passwordConf.value) {
				return passwordConf.setErrors({
					'mismatchedPasswords': true
				})
			}
		}
	}

	static checkString(control) {
		if(control.value.match(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/)) {
			return null;
		} else {
			return { 'invalidString': true}
		}
	}

	static checkZip(control) {
		if(control.value.match(/^\d{5}$/) || control.value.length < 1) {
			return null;
		} else {
			return { 'invalidZip': true }
		}
	}
}