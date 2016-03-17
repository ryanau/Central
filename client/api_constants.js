class Api_Constants {
	constructor() {
		this.origin = 'http://localhost:3000/api/'
		this.admin_origin = this.origin + 'admin/'
		this.user_origin = this.origin + 'user/'
		this.victim_origin = this.origin + 'victims/'
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
	get victims() {
		return {
			join: this.victim_origin + 'join',
		}
	}
	// Admin
	get events() {
		return {
			collection: this.admin_origin + 'events',
			event: (id) => this.admin_origin + `events/${id}`,
			create: this.admin_origin + 'events',
			archive: (id) => this.admin_origin + `events/${id}/archive`,
		}
	}
	get reports() {
		return {
			collection: this.admin_origin + 'reports',
			report: (id) => this.admin_origin + `reports/${id}`,
			dispatch: (id) => this.admin_origin + `reports/${id}/dispatch_report`,
			edit: (id) => this.admin_origin + `reports/${id}`,		
		}
	}
	get messages() {
		return {
			approve: (id) => this.admin_origin + `messages/${id}/approve`,
		}
	}

	// User
	get user_events() {
		return {
			collection: this.user_origin + 'events',
			event: (id) => this.user_origin + `events/${id}`,
			activate: (id) => this.user_origin + `events/${id}/activate`,
		}
	}
	get user_reports() {
		return {
			collection: this.user_origin + 'reports',
			report: (id) => this.user_origin + `reports/${id}`,
		}
	}
	get user_messages() {
		return {
			collection: this.user_origin + 'messages',
			edit: (id) => this.user_origin + `messages/${id}`,
			create: this.user_origin + 'messages',
			delete: (id) => this.user_origin + `messages/${id}`,
		}
	}
}

const ApiConstants = new Api_Constants();
export default ApiConstants