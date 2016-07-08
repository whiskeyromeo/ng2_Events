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

	/*
		Add A User.
		Temporary: Remove upon database integration.
	*/
	addUser(name: string, email: string, password: string, occupation?: string, state?: string, city?: string, zip?: number ) {
		var index = this.getNewId(this.users);
		var user = new User(index, name, email, password, occupation, state, city, zip);
		this.users.push(user);
		this.updateUserStore();
	}

	getUserEmails() {
		let userEmails = [];
		for(let user of this.users) {
			userEmails.push(user.email);
		}
		return userEmails;
	}

	/*
		Delete a User's account
	*/
	removeUser(user: User) {
		let index = this.users.indexOf(user);
		this.users.splice(index, 1);
		this.updateUserStore();
	}

	/*
		Create a unique id for each user that signs up.
		Temporary: Remove upon database integration.
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




}