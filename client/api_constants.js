class Api_Constants {
	constructor() {
		this.origin = 'http://localhost:3000/api/'
	}
	get session() {
		return {
			sign_up: this.origin + 'auth',
			sign_in: this.origin + 'auth/sign_in',
			sign_out: this.origin + 'auth/sign_out',
			admin_sign_up: this.origin + 'admin_auth',
			admin_sign_in: this.origin + 'admin_auth/sign_in',
			admin_sign_out: this.origin + 'admin_auth/sign_out',
			identity: this.origin + 'session/identity',
		}
	}
	get events() {
		return {
			collection: this.origin + 'events',
			create: this.origin + 'events',
			archive: (id) => this.origin + `events/${id}/archive`,
		}
	}
}

const ApiConstants = new Api_Constants();
export default ApiConstants