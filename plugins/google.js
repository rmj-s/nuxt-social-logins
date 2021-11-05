import Vue from 'vue';
import GoogleButton from '../components/GoogleButton';

export default (ctx, inject) => {
	const options = JSON.parse('<%= JSON.stringify(options) %>');

	if (!options.clientId) {
		console.error('Please provide client ID for your Google Platform app!');
		return;
	}

	let auth2 = null;
	const googleAuth = {
		init: () => {
			return new Promise((resolve) => {
                // TODO: Catch not whitelisted error
				gapi.load('auth2', async () => {
					auth2 = await gapi.auth2.init({
						clientId: options.clientId,
					});

					let userData = null;
					const signedIn = auth2.isSignedIn.get();

					if (signedIn) {
						const profile = auth2.currentUser
							.get()
							.getBasicProfile();
						userData = {
							id: profile.getId(),
							firstName: profile.getGivenName(),
							lastName: profile.getFamilyName(),
							email: profile.getEmail(),
						};
					}

					resolve({
						signedIn: signedIn,
						userData: userData,
					});
				});
			});
		},
		signIn: () => {
			return new Promise((resolve, reject) => {
				auth2
					.signIn()
					.then(() => {
						const profile = auth2.currentUser
							.get()
							.getBasicProfile();
						const userData = {
							id: profile.getId(),
							firstName: profile.getGivenName(),
							lastName: profile.getFamilyName(),
							email: profile.getEmail(),
							id_token: auth2.currentUser.get().getAuthResponse().id_token
						};

						resolve({
							signedIn: true,
							userData: userData,
						});
					})
					.catch((err) => {
						// TODO: Log error? Expose it?
						reject('Sign in was unsuccessful!');
					});
			});
		},
		signOut: () => {
			return new Promise((resolve, reject) => {
				auth2
					.signOut()
					.then(() => {
						resolve('Signed out successfully!');
					})
					.catch(() => {
						reject('Sign out was unsuccessful!');
					});
			});
		},
	};

	ctx.$googleAuth = googleAuth
	inject('googleAuth', googleAuth)
	Vue.component('google-button', GoogleButton);
};
