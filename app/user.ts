export class User {

	constructor(
		public id: number, 
		public name: string,
		public email: string,
		public password: string,
		public occupation?: string,
		public state?: string,
		public city? : string,
		public zip? : string
	) { }

}