import { User } from '../user';

export class UserStore {
	users: User[];

	constructor() {
		let persistedUsers = JSON.parse(localStorage.getItem('ng2-users') || '[]');


		//TODO : localStorage - options
		this.users = persistedUsers.map((user: {
			id: number,
			name: string,
			email: string,
			password: string,
			occupation: string,
			state: string,
			city: string,
			zip: number
		}) => {
			let ret = new User(
				user.id,
				user.name,
				user.email,
				user.password,
				user.occupation,
				user.state,
				user.city,
				user.zip
			);
			return ret;
		});
	}


	private updateUserStore() {
		localStorage.setItem('ng2-users', JSON.stringify(this.users));
	}

	addUser(name: string, email: string, password: string, occupation?: string, state?: string, city?: string, zip?: number ) {
		var index = this.users.length + 1;
		var user = new User(index, name, email, password, occupation, state, city, zip);
		this.users.push(user);
		this.updateUserStore();
	}

	removeUser(user: User) {
		let index = this.users.indexOf(user);
		this.users.splice(index, 1);
		this.updateUserStore();
	}





}