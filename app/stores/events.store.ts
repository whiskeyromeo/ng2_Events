//import { Event } from '../event'

export class Event {
	private _title: String;
	private _type: String;
	private _description: String;
	//private _startDate: String;

	get title() {
		return this._title;
	}

	get type() {
		return this._type;
	}

	get description() {
		return this._description;
	}

	constructor(title: String, type: String, description: String ) {
		this._title = title;
		this._type = type;
		this._description = description;
	}

}

export class EventStore {
	events: Event[];

	constructor() {
		let persistedEvents = JSON.parse(localStorage.getItem('ng2-events') || '[]');
		//Normalize back into classes
		this.events = persistedEvents.map((event: {
			_title: String,
			_type: String,
			_description: String
		}) => {
			let ret = new Event(event._title, event._type, event._description);
			return ret;
		});
	}

	private updateStore() {
		localStorage.setItem('ng2-events', JSON.stringify(this.events));
	}

	addEvent(title: string, type: string, desc?: string, sDate?: string, eDate?: string, sTime?: string, guests?: string, eTime?: string) {
		var event = new Event(title, type, desc);
		this.events.push(event)
		this.updateStore();
	}

	removeEvent(event: Event) {
		let index = this.events.indexOf(event);
		this.events.splice(index, 1);
		this.updateStore();
	}
}
