import Request from 'superagent';
import toastr from 'toastr';
import { browserHistory } from 'react-router';

class Api_Requests {
	_errorHandler(err, res) {
		toastr.options = {
		  "closeButton": false,
		  "debug": false,
		  "newestOnTop": true,
		  "progressBar": true,
		  "positionClass": "toast-top-right",
		  "preventDuplicates": false,
		  "onclick": null,
		  "showDuration": "300",
		  "hideDuration": "1000",
		  "timeOut": "2000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		}
		const parsed = JSON.parse(res['text'])

		// handling sign up/sign in error messages
		if (parsed.errors.full_messages) {
			parsed.errors.full_messages.forEach((err) => {
				toastr.error(err, res['statusText'])
			});
		} else {
			parsed.errors.forEach((err) => {
				toastr.error(err, res['statusText'])
			});
		}
	}
	_localStorageSetter(res) {
		if (res['header']['uid']) {
		localStorage.setItem('access-token', res['header']['access-token']);
		localStorage.setItem('client', res['header']['client']);
		localStorage.setItem('expiry', res['header']['expiry']);
		localStorage.setItem('token-type', res['header']['token-type']);
		localStorage.setItem('uid', res['header']['uid']);	
		}
	}
	redirect = (url) => {
	  browserHistory.push(url);
	}
	get(url, data, onSuccess) {
		Request
			.get(url)
			.set('access-token', localStorage.getItem('access-token'))
			.set('client', localStorage.getItem('client'))
			.set('expiry', localStorage.getItem('expiry'))
			.set('token-type', localStorage.getItem('token-type'))
			.set('uid', localStorage.getItem('uid'))
			.end((err, res) => {
				if (err) {
					this._errorHandler(err, res)
				} else {
					this._localStorageSetter(res);
					onSuccess(res);
				}
			});
	}
	post(url, data, onSuccess) {
		Request
		  .post(url)
		  .send(data)
		  .set('access-token', localStorage.getItem('access-token'))
		  .set('client', localStorage.getItem('client'))
		  .set('expiry', localStorage.getItem('expiry'))
		  .set('token-type', localStorage.getItem('token-type'))
		  .set('uid', localStorage.getItem('uid'))
		  .end((err, res) => {
		  	if (err) {
		  		this._errorHandler(err, res)
		  	} else {
		  		this._localStorageSetter(res);
		  		onSuccess(res);
		  	}
		  })
	}
}

const ApiRequests = new Api_Requests();
export default ApiRequests