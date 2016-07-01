import {Event} from '../event';

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

	private updateEventStore() {
		localStorage.setItem('ng2-events', JSON.stringify(this.events));
	}

	/*
		Add an event
	*/
	addEvent(title: string, type: string, sDate: any, eDate:any, creatorId: number, desc?: string, host?:string, guests?:string) {
		
		let id = this.getNewId(this.events);
		var event = new Event(id, title, type, desc, sDate, eDate, creatorId, host, guests);
		this.events.push(event)
		this.updateEventStore();
	}

	/*
		Update an event
	*/
	updateEvent(editedEvent: Event) {
		for(let ev in this.events) {
			if(this.events.hasOwnProperty(ev)) {
				if (this.events[ev].id === editedEvent.id) {
					this.events[ev] = editedEvent;
					this.updateEventStore();
					break;
				}
			}
		}	
	}

	/*
		Create a unique id for each event created.
		Temporary: To be removed upon database integration.
	*/
	getNewId(arr) {
		if (arr.length < 1) {
			return 1;
		} else {
			let idArr = [];
			for (let i = 0; i < arr.length; i++) {
				idArr.push(arr[i].id);
			}
			return Math.max(...idArr) + 1;
		}
	}

	removeEvent(event: Event) {
		let index = this.events.indexOf(event);
		this.events.splice(index, 1);
		this.updateEventStore();
	}
}
