class Api_Constants {
	constructor() {
		this.origin = 'http://localhost:3000/api/'
	}
	get session() {
		return {
			sign_up: this.origin + 'auth',
			sign_in: this.origin + 'auth/sign_in',
			sign_out: this.origin + 'auth/sign_out',
			identity: this.origin + 'session/identity'
		}
	}
}

const ApiConstants = new Api_Constants();
export default ApiConstants