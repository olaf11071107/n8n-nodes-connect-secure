import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ConnectSecureApi implements ICredentialType {
	name = 'connectSecureApi';
	displayName = 'Connect Secure API';
	documentationUrl = 'https://connect-secure.com/docs';
	properties: INodeProperties[] = [
		{
			displayName: 'Tenant',
			name: 'tenant',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'https://api.connect-secure.com',
		},
		{
			displayName: 'User ID',
			name: 'userId',
			type: 'string',
			default: '',
			required: true,
			description: 'User ID for the X-USER-ID header required by the API',
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Access token for API authentication (can be obtained using the Authorize operation)',
		},
	];
}
