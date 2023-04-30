import jwt_decode from 'jwt-decode';
import Vue from 'vue';
import GoogleButton from '../components/GoogleButton';

export default (ctx, inject) => {
	const options = JSON.parse('<%= JSON.stringify(options) %>');

	if (!options.clientId) {
		console.error('Please provide client ID for your Google Platform app!');
		return;
	}

	const googleAuth = {
		init: (element, callback, styling = null) => {
      google.accounts.id.initialize({
        client_id: options.clientId,
        ux_mode: 'popup',
        callback: (response) => {
          const responsePayload = jwt_decode(response.credential);

          const userData = {
            id: responsePayload.sub,
            firstName: responsePayload.given_name,
            lastName: responsePayload.given_name,
            email: responsePayload.email,
            id_token: response.credential
          };

          callback({
            signedIn: true,
            userData: userData
          });
        }
      });

      if (styling === null) {
        styling = {
          theme: 'outline',
          size: 'large',
          shape: 'pill'
        };
      }

      google.accounts.id.renderButton(
        element,
        styling
      );
		},
		signIn: () => {
      google.accounts.id.prompt()
		},
		signOut: (hint, callback) => {
      google.accounts.id.revoke(hint, callback);
		},
	};

	ctx.$googleAuth = googleAuth
	inject('googleAuth', googleAuth)
	Vue.component('google-button', GoogleButton);
};
