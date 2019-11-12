import React from 'react';
import ReactDOM from 'react-dom';
import Amplify, { Auth } from 'aws-amplify';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import config from './config';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: config.cognito.REGION,
		userPoolId: config.cognito.USER_POOL_ID,
		userPoolWebClientId: config.cognito.APP_CLIENT_ID,
		oauth: {
			domain: config.cognito.DOMAIN,
			scope: config.cognito.SCOPE,
			redirectSignIn: config.cognito.REDIRECT_SIGN_IN,
			redirectSignOut: config.cognito.REDIRECT_SIGN_OUT,
			responseType: config.cognito.RESPONSE_TYPE
		}
	},
	API: {
		endpoints: [
			{
				name: 'testApiCall',
				endpoint: config.apiGateway.URL,
				region: config.apiGateway.REGION,
				custom_header: async () => {
					return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
				}
			}
		]
	}
});

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
);
registerServiceWorker();
