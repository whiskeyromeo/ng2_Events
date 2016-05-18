import { Component, ElementRef, OnInit, EventEmitter } from '@angular/core';
import { DefaultValueAccessor, NgControl} from '@angular/common';

declare var jQuery: any;

@Component({
	selector: 'my-timepicker',
	template: `
		<input type="text" class="blah"/>
	`
})

export class timepickerComponent {
	constructor(private _elRef: ElementRef) {
	}

	ngOnInit(): any {
		jQuery(this._elRef.nativeElement).find('.blah').timepicker(
			{ 'scrollDefault': 'now' }
		)
	}

}