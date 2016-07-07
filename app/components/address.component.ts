import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { Control } from '@angular/common';
@Component({
	selector: 'address',
	templateUrl: 'app/templates/address.component.html',
	styleUrls: ['static/css/address.component.css'],
	providers: [],
	inputs: ['address', 'addressControl']
})

export class AddressComponent implements OnInit{
	@Input() location: any;
	@Input() addressControl: any;
	@Output() onChange = new EventEmitter();
	google: any;
	lat: any;
	lng: any;

	constructor(
		private cdr:ChangeDetectorRef
	) { 
	}

	ngOnInit() {
		let instance = this
		instance.input = document.getElementById('search-box');
		let options = {
			types: [
				'geocode',
			],
		};
		
		let autocomplete = new google.maps.places.Autocomplete(instance.input, options);
		/*
			TODO: Fix listener so that it works on event-edit.
			Right now it works intermittently and only for certain 
			inputs, such as 1. Perhaps something to do with having
			multiple autocomplete inputs in a single application?
		*/
		//console.log('about to add listener');
		let autoListener = google.maps.event.addListener(autocomplete, 'place_changed', () => {
			console.log('adding listener')
			this.location = autocomplete.getPlace().formatted_address;
			this.onChange.emit(this.location);
			//this.lat = place.geometry.location.lat();
			//this.lng = place.geometry.location.lng();
			//instance.setValue(place.formatted_address);			
		});
		//console.log('autoListener: ',autoListener)
		//google.maps.event.removeListener(autoListener);
	}

	public setValue(a) {
		this.location = a;
		console.log(a);
		this.onChange.emit(a);
		this.cdr.detectChanges();
	}
}