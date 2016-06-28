//import { Event } from '../event'

export class Event {
	private _id: number;
	private _title: string;
	private _type: string;
	private _description: string;
	private _startDate: string;
	private _endDate: string;
	private _creatorId: number;
	private _host: string;
	private _guests?: string;

	get id() { return this._id; }

	get creatorId() { return this._creatorId }

	get title() { return this._title; }

	get type() { return this._type; }

	get description() { return this._description; }

	get startDate() {
		return this._startDate;
	}

	get endDate() {
		return this._endDate;
	}

	get host() {
		return this._host;
	}

	get guests() {
		return this._guests;
	}

	constructor(id: number, title: string, type: string, description: string, startDate: string, endDate: string, creatorId: number, host?: string, guests?: string) {
		this._id = id;
		this._title = title;
		this._type = type;
		this._description = description;
		this._startDate = startDate;
		this._endDate = endDate;
		this._creatorId = creatorId;
		this._host = host;
		this._guests = guests;

	}

}

export class EventStore {
	events: Event[];

	constructor() {
		let persistedEvents = JSON.parse(localStorage.getItem('ng2-events') || '[]');
		
		//Normalize back into classes
		this.events = persistedEvents.map((event: {
			_id: number,
			_title: string,
			_type: string,
			_description: string,
			_startDate: string,
			_endDate: string,
			_creatorId: number,
			_host: string,
			_guests: string
		}) => {
			let ret = new Event(
				event._id,
				event._title,
				event._type,
				event._description,
				event._startDate,
				event._endDate,
				event._creatorId,
				event._host,
				event._guests
			);
			return ret;
		});
	}

	private updateStore() {
		localStorage.setItem('ng2-events', JSON.stringify(this.events));
	}

	addEvent(title: string, type: string, sDate: string, eDate: string, creatorId: number, desc?: string, host?: string, guests?: string) {
		let id = this.events.length + 1;
		var event = new Event(id, title, type, desc, sDate, eDate, creatorId, host, guests);
		this.events.push(event)
		this.updateStore();
	}

	removeEvent(event: Event) {
		let index = this.events.indexOf(event);
		this.events.splice(index, 1);
		this.updateStore();
	}
}
