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