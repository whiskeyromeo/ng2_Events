export class Event {
	constructor(
		public id: number,
		public title: string,
		public type: string,
		public description?: string,
		public startDate?: string,
		public endDate?: string,
		public startTime?: string,
		public guests?: string,
		public endTime?: string
	) { }
}

