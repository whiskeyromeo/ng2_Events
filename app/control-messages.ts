import { Component, Host } from '@angular/core';
import { NgFormModel } from '@angular/common';
import { ValidationService } from './services/validation.service';


@Component({
	selector: 'control-messages',
	inputs: ['controlName: control', 'typeName: type'],
	template: `<div *ngIf="errorMessage !==null">{{errorMessage}}</div>`
})

export class ControlMessages {
	controlName: string;
	typeName: string;
	constructor( @Host() private _formDir: NgFormModel) { }

	get errorMessage() {
		//Find the control in the parent form
		let c = this._formDir.form.find(this.controlName);

		for( let propertyName in c.errors) {
			//If control has an error
			if (c.errors.hasOwnProperty(propertyName) && c.touched) {
				//Return the error message from the validation service
				return ValidationService.getValidatorErrorMessage(propertyName, this.typeName);
			}
		}

		return null;
	}
}