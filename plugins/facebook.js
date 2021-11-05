import Vue from 'vue';
import FacebookButton from '../components/FacebookButton';

const USER_PROFILE_QUERY = {
	fields: 'id, first_name, last_name, email',
};

export default (ctx, inject) => {
	const options = JSON.parse('<%= JSON.stringify(options) %>');

	if (!options.appId) {
		console.error('Please provide application ID for your Facebook app!');
		return;
	}

	const fbAuth = {
		init: () => {
			return new Promise(async (resolve) => {
				await FB.init({
					appId: options.appId,
					autoLogAppEvents: true,
					xfbml: false,
					version: 'v6.0',
				});

				FB.getLoginStatus((res) => {
					if (res.authResponse) {
						FB.api('/me', USER_PROFILE_QUERY, (profile) => {
							resolve({
								signedIn: true,
								userData: {
									id: profile.id,
									firstName: profile.first_name,
									lastName: profile.last_name,
									email: profile.email,
								},
							});
						});
					} else {
						resolve({
							signedIn: false,
							userData: null,
						});
					}
				}, true);
			});
		},
		signIn: () => {
			return new Promise((resolve, reject) => {
				FB.login(
					(response) => {
						if (response.authResponse) {
							FB.api('/me', USER_PROFILE_QUERY, (profile) => {
								resolve({
									signedIn: true,
									userData: {
										id: profile.id,
										firstName: profile.first_name,
										lastName: profile.last_name,
										email: profile.email,
										accessToken: response.authResponse.accessToken
									},
								});
							});
						} else {
							reject('Login was unsuccessful!');
						}
					},
					{ scope: 'email' }
				);
			});
		},
		signOut: () => {
			return new Promise((resolve) => {
				FB.logout((res) => {
                    resolve('Logged out successfully!');
                });
			});
		},
	};

	ctx.$fbAuth = fbAuth
  inject('fbAuth', fbAuth)
	Vue.component('facebook-button', FacebookButton);
};
