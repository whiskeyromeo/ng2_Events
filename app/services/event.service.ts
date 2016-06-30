import { Injectable } from '@angular/core';
import { Event, EventStore } from '../stores/events.store';

@Injectable()
export class EventService{
	eventStore: EventStore

	constructor(
		private eStore: EventStore
	) {
		this.eventStore = eStore;
	}

	getEvent(id: number) {
		return Promise.resolve(this.eventStore.events).then(
			events => events.filter(event => event.id === id)[0]
		);
	}

	getEvent2(id: number) {
		return this.eventStore.events.filter(event => event.id === id)[0];
	}

}