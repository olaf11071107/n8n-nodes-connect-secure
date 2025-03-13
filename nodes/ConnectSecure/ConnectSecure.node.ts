import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	IHttpRequestMethods,
	NodePropertyTypes,
} from 'n8n-workflow';
import { IDataObject, IHttpRequestOptions } from 'n8n-workflow';
import { OptionsWithUri } from 'request-promise-native';

import { resources } from './ConnectSecureInterfaces';

interface IOperation {
	value: string;
	name: string;
	description: string;
	action: string;
	method: string;
	endpoint: string;
}

export class ConnectSecure implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Connect Secure',
		name: 'connectSecure',
		icon: 'file:connect-secure.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Connect Secure API',
		defaults: {
			name: 'Connect Secure',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'connectSecureApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				required: true,
				options: resources.map((resource) => ({
					name: resource.name,
					value: resource.value,
					description: resource.description,
				})),
				default: 'company',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'auth',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'auth')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'authorize',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'company',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'company')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getAllCompanies',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'agent',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'agent')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getAllAgents',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'credentials',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'credentials')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getAllCredentials',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'discoverySettings',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'discoverySettings')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getAllDiscoverySettings',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'asset',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'asset')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getAllAssets',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'assetData',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'assetData')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getAssetFirewallPolicy',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'agentCredentialsMapping',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'agentCredentialsMapping')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getAllAgentCredentialsMappings',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'agentDiscoverySettingsMapping',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'agentDiscoverySettingsMapping')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getAgentDiscoverySettingsMapping',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'vulnerability',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'vulnerability')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getSuppressVulnerability',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'firewall',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'firewall')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getFirewallGroups',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'bios',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'bios')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getBiosInfo',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'browser',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'browser')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getBrowserExtensions',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'ciphers',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'ciphers')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getCiphersView',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'windowsProtection',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'windowsProtection')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getWindowsProtectionStatus',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'reportQueries',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'reportQueries')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getAssetSecurityReportData',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'integration',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'integration')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getCompanyMappings',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'authorization',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'authorization')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'authorize',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'reportBuilder',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'reportBuilder')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getStandardReportSettings',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'adInformation',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'adInformation')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getAdInformation',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'assetDetails',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'assetDetails')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getAssetDetails',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'eventInformation',
						],
					},
				},
				options: resources
					.find((resource) => resource.value === 'eventInformation')!
					.operations.map((operation) => ({
						name: operation.name,
						value: operation.value,
						description: operation.description,
						action: operation.action,
						method: operation.method,
					})),
				default: 'getEventInformation',
			},
			{
				displayName: 'Body Parameters',
				name: 'bodyParameters',
				type: 'collection',
				placeholder: 'Add Parameter',
				default: {},
				displayOptions: {
					show: {
						operation: [
							'createCompany',
							'updateCompany',
							'createCredential',
							'updateCredential',
							'createDiscoverySetting',
							'updateDiscoverySetting',
							'createAsset',
							'updateAsset',
							'createAgentCredentialsMapping',
							'updateAgentCredentialsMapping',
							'createAgentDiscoverySettingsMapping',
							'updateAgentDiscoverySettingsMapping',
							'createSuppressVulnerability',
							'createCompanyMapping',
							'createIntegrationCredential',
							'createIntegrationRule',
							'authorize',
						],
					},
				},
				options: [
					{
						displayName: 'JSON Request Body',
						name: 'jsonRequestBody',
						type: 'json',
						default: '{\n  "data": {\n    \n  }\n}',
						typeOptions: {
							rows: 8,
						},
						description: 'JSON data to send in the request body',
					},
				],
			},
			{
				displayName: 'Query Parameters',
				name: 'queryParameters',
				type: 'collection',
				placeholder: 'Add Parameter',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'company',
							'agent',
							'credentials',
							'discoverySettings',
							'asset',
							'assetData',
							'agentCredentialsMapping',
							'agentDiscoverySettingsMapping',
							'vulnerability',
							'firewall',
							'bios',
							'browser',
							'ciphers',
							'windowsProtection',
							'reportQueries',
							'integration',
							'authorization',
							'reportBuilder',
							'adInformation',
							'assetDetails',
							'eventInformation',
						],
						operation: [
							'getAllCompanies',
							'getCompanyStats',
							'getCompanyStat',
							'getAssetWindowsCompatibility',
							'getAllAgents',
							'getAllCredentials',
							'getAllDiscoverySettings',
							'getAllAssets',
							'getAssetStats',
							'getAssetStat',
							'getAssetFirewallPolicy',
							'getAssetFirewallPolicyById',
							'getAssetInstalledDrivers',
							'getAssetInstalledDriver',
							'getAssetInterfaces',
							'getAssetInterface',
							'getAssetMsdt',
							'getAssetMsdtById',
							'getAssetPorts',
							'getAssetPort',
							'getAssetSecurityReportData',
							'getAssetSecurityReportDatum',
							'getAssetShares',
							'getAssetShare',
							'getAssetStorages',
							'getAssetStorage',
							'getAssetUnquotedServices',
							'getAssetComplianceReportCard',
							'getAllJobs',
							'getAllAgentCredentialsMappings',
							'getAgentDiscoverySettingsMapping',
							'getSuppressVulnerability',
							'getSuppressVulnerabilityById',
							'getFirewallGroups',
							'getFirewallGroupById',
							'getFirewallInterfaces',
							'getFirewallInterfaceById',
							'getFirewallLicense',
							'getFirewallLicenseById',
							'getFirewallRules',
							'getFirewallRuleById',
							'getFirewallUsers',
							'getFirewallUserById',
							'getFirewallZones',
							'getFirewallZoneById',
							'getBiosInfo',
							'getBrowserExtensions',
							'getCiphersView',
							'getWindowsProtectionStatus',
							'getAssetSecurityReportData',
							'getAssetSoftware',
							'getAssetWiseVulnerabilities',
							'getAssetsByApplication',
							'getAssetsByApplicationSuppressed',
							'getCertInfoView',
							'getCompaniesByApplication',
							'getCompaniesByApplicationSuppressed',
							'getCompaniesByProblemGroup',
							'getCompaniesByProblemGroupSuppressed',
							'getComplianceAssetInfo',
							'getComplianceCheckAssetCount',
							'getComplianceCheckCompanyCount',
							'getComplianceCheckCount',
							'getComplianceCheckCountBySection',
							'getCompanyMappings',
							'getCompanyMappingById',
							'getIntegrationCredentials',
							'getIntegrationCredentialById',
							'getIntegrationRules',
							'getIntegrationRuleById',
							'getAssetUserShares',
							'getAssetUserShareById',
							'getAssetVideoInfo',
							'getAssetVideoInfoById',
							'getAssetView',
							'getAssetViewById',
							'getAssetWindowsRebootRequired',
							'getAssetWindowsRebootRequiredById',
							'getAssetUnquotedServiceById',
						],
					},
				},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 50,
						description: 'Max number of results to return',
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'Offset to start from',
					},
					{
						displayName: 'Sort',
						name: 'sort',
						type: 'string',
						default: '',
						placeholder: 'id:asc',
						description: 'Sort order, e.g. id:asc',
					},
					{
						displayName: 'Filter',
						name: 'filter',
						type: 'string',
						default: '',
						placeholder: 'company_id=123',
						description: 'Filter conditions',
					},
				],
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: [
							'createCompany',
							'updateCompany',
							'createCredential',
							'updateCredential',
							'createDiscoverySetting',
							'updateDiscoverySetting',
							'createAsset',
							'updateAsset',
							'createAgentCredentialsMapping',
							'updateAgentCredentialsMapping',
							'createAgentDiscoverySettingsMapping',
							'updateAgentDiscoverySettingsMapping',
							'createSuppressVulnerability',
							'createCompanyMapping',
							'createIntegrationCredential',
							'createIntegrationRule',
							'authorize',
						],
					},
				},
				options: [
					{
						displayName: 'JSON Request Body',
						name: 'jsonRequestBody',
						type: 'json',
						default: '{\n  "data": {\n    \n  }\n}',
						typeOptions: {
							rows: 8,
						},
						description: 'JSON data to send in the request body',
					},
				],
			},
			...resources.flatMap(resource => 
				resource.operations
					.filter(operation => operation.fields && operation.fields.length > 0)
					.map(operation => ({
						displayName: 'Operation Parameters',
						name: `${operation.value}Parameters`,
						type: 'collection' as NodePropertyTypes,
						placeholder: 'Add Parameter',
						default: {},
						displayOptions: {
							show: {
								resource: [resource.value],
								operation: [operation.value],
							},
						},
						options: operation.fields!.map(field => ({
							displayName: field.name.charAt(0).toUpperCase() + field.name.slice(1),
							name: field.name,
							type: field.type as unknown as NodePropertyTypes,
							default: field.default,
							description: field.description,
							required: field.required,
							...(field.displayOptions && { displayOptions: field.displayOptions }),
							...(field.options && { options: field.options }),
						})),
					}))
			),
			{
				displayName: 'Company ID',
				name: 'companyId',
				type: 'string' as NodePropertyTypes,
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['company'],
						operation: ['getCompany', 'updateCompany', 'deleteCompany', 'getCompanyStats', 'getJob'],
					},
				},
			},
			{
				displayName: 'Job ID',
				name: 'jobId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['company'],
						operation: ['getJob'],
					},
				},
			},
			{
				displayName: 'Stat ID',
				name: 'statId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['company'],
						operation: ['getCompanyStat'],
					},
				},
			},
			{
				displayName: 'Agent ID',
				name: 'agentId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['agent'],
						operation: ['getAgent', 'updateAgent', 'deleteAgent'],
					},
				},
			},
			{
				displayName: 'Credential ID',
				name: 'credentialId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['credentials'],
						operation: ['getCredential', 'updateCredential', 'deleteCredential'],
					},
				},
			},
			{
				displayName: 'Discovery Setting ID',
				name: 'discoverySettingId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['discoverySettings'],
						operation: ['getDiscoverySetting', 'updateDiscoverySetting', 'deleteDiscoverySetting'],
					},
				},
			},
			{
				displayName: 'Asset ID',
				name: 'assetId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['asset'],
						operation: ['getAsset', 'updateAsset', 'deleteAsset', 'getAssetStats'],
					},
				},
			},
			{
				displayName: 'Asset Stat ID',
				name: 'assetStatId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['asset'],
						operation: ['getAssetStat'],
					},
				},
			},
			{
				displayName: 'Asset ID',
				name: 'assetId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['assetData'],
						operation: [
							'getAssetFirewallPolicy',
							'getAssetInstalledDrivers',
							'getAssetInterfaces',
							'getAssetMsdt',
							'getAssetPorts',
							'getAssetSecurityReportData',
							'getAssetShares',
							'getAssetStorages',
							'getAssetUnquotedServices',
							'getAssetComplianceReportCard',
						],
					},
				},
			},
			{
				displayName: 'Firewall Policy ID',
				name: 'firewallPolicyId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['assetData'],
						operation: ['getAssetFirewallPolicyById'],
					},
				},
			},
			{
				displayName: 'Driver ID',
				name: 'driverId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['assetData'],
						operation: ['getAssetInstalledDriver'],
					},
				},
			},
			{
				displayName: 'Interface ID',
				name: 'interfaceId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['assetData'],
						operation: ['getAssetInterface'],
					},
				},
			},
			{
				displayName: 'MSDT ID',
				name: 'msdtId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['assetData'],
						operation: ['getAssetMsdtById'],
					},
				},
			},
			{
				displayName: 'Port ID',
				name: 'portId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['assetData'],
						operation: ['getAssetPort'],
					},
				},
			},
			{
				displayName: 'Report ID',
				name: 'reportId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['assetData'],
						operation: ['getAssetSecurityReportDatum'],
					},
				},
			},
			{
				displayName: 'Share ID',
				name: 'shareId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['assetData'],
						operation: ['getAssetShare'],
					},
				},
			},
			{
				displayName: 'Storage ID',
				name: 'storageId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['assetData'],
						operation: ['getAssetStorage'],
					},
				},
			},
			{
				displayName: 'Mapping ID',
				name: 'mappingId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['agentCredentialsMapping'],
						operation: ['getAgentCredentialsMapping', 'updateAgentCredentialsMapping', 'deleteAgentCredentialsMapping'],
					},
				},
			},
			{
				displayName: 'Mapping ID',
				name: 'mappingId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['agentDiscoverySettingsMapping'],
						operation: ['getAgentDiscoverySettingsMapping', 'updateAgentDiscoverySettingsMapping', 'deleteAgentDiscoverySettingsMapping'],
					},
				},
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['auth'],
						operation: ['authorize'],
					},
				},
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['auth'],
						operation: ['authorize'],
					},
				},
			},
			{
				displayName: 'Job ID',
				name: 'jobId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['company'],
						operation: ['getJob'],
					},
				},
			},
			{
				displayName: 'Vulnerability ID',
				name: 'vulnerabilityId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['vulnerability'],
						operation: ['getSuppressVulnerabilityById', 'deleteSuppressVulnerability'],
					},
				},
			},
			{
				displayName: 'Firewall Group ID',
				name: 'firewallGroupId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['firewall'],
						operation: ['getFirewallGroupById'],
					},
				},
			},
			{
				displayName: 'Firewall Interface ID',
				name: 'firewallInterfaceId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['firewall'],
						operation: ['getFirewallInterfaceById'],
					},
				},
			},
			{
				displayName: 'Firewall License ID',
				name: 'firewallLicenseId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['firewall'],
						operation: ['getFirewallLicenseById'],
					},
				},
			},
			{
				displayName: 'Firewall Rule ID',
				name: 'firewallRuleId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['firewall'],
						operation: ['getFirewallRuleById'],
					},
				},
			},
			{
				displayName: 'Firewall User ID',
				name: 'firewallUserId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['firewall'],
						operation: ['getFirewallUserById'],
					},
				},
			},
			{
				displayName: 'Firewall Zone ID',
				name: 'firewallZoneId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['firewall'],
						operation: ['getFirewallZoneById'],
					},
				},
			},
			{
				displayName: 'Asset ID',
				name: 'assetId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['assetData'],
						operation: [
							'getAssetUserShareById',
							'getAssetVideoInfoById',
							'getAssetViewById',
							'getAssetWindowsRebootRequiredById',
							'getAssetUnquotedServiceById',
						],
					},
				},
			},
			{
				displayName: 'Company Mapping ID',
				name: 'companyMappingId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['integration'],
						operation: ['getCompanyMappingById', 'deleteCompanyMapping'],
					},
				},
			},
			{
				displayName: 'Integration Credential ID',
				name: 'integrationCredentialId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['integration'],
						operation: ['getIntegrationCredentialById', 'deleteIntegrationCredential'],
					},
				},
			},
			{
				displayName: 'Integration Rule ID',
				name: 'integrationRuleId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['integration'],
						operation: ['getIntegrationRuleById', 'deleteIntegrationRule'],
					},
				},
			},
		],
	};

	static getEndpointForOperation(resource: string, operation: string): string | null {
		for (const resourceItem of resources) {
			if (resourceItem.value === resource) {
				for (const operationItem of resourceItem.operations) {
					if (operationItem.value === operation) {
						return operationItem.endpoint;
					}
				}
			}
		}
		return null;
	}

	static getOperationDetails(resource: string, operation: string): IOperation | null {
		for (const resourceItem of resources) {
			if (resourceItem.value === resource) {
				for (const operationItem of resourceItem.operations) {
					if (operationItem.value === operation) {
						return operationItem;
					}
				}
			}
		}
		return null;
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// For each item
		for (let i = 0; i < items.length; i++) {
			try {
				// Get parameters
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				// Get query parameters if provided
				let queryParameters: IDataObject | undefined;
				const queryParamsParameter = this.getNodeParameter('queryParameters', i, null);
				if (queryParamsParameter !== null && typeof queryParamsParameter === 'object') {
					queryParameters = queryParamsParameter as IDataObject;
				}

				// Get body parameters if provided
				let bodyParameters: IDataObject | undefined;
				const bodyParamsParameter = this.getNodeParameter('bodyParameters', i, null);
				if (bodyParamsParameter !== null && typeof bodyParamsParameter === 'object') {
					bodyParameters = bodyParamsParameter as IDataObject;
				}

				// Get operation details
				const operationDetails = resources
					.find((r) => r.value === resource)!
					.operations.find((o) => o.value === operation)!;

				// Set up the endpoint with path parameters
				let endpoint = operationDetails.endpoint;
				
				// Check if operation has specific parameters defined
				const operationParameterName = `${operation}Parameters`;
				const hasOperationParameters = operationDetails.fields && operationDetails.fields.length > 0;
				
				// Get operation-specific parameters if they exist
				let operationParameters: IDataObject = {};
				if (hasOperationParameters) {
					const params = this.getNodeParameter(operationParameterName, i, {}) as IDataObject;
					if (params) {
						operationParameters = params;
					}
				}

				// Replace path parameters in endpoint
				if (endpoint.includes('{')) {
					// Extract all path parameters
					const pathParams = endpoint.match(/{([^}]+)}/g) || [];
					
					for (const param of pathParams) {
						const paramName = param.replace('{', '').replace('}', '');
						let paramValue = '';
						
						// Try to get the value from operation parameters first
						if (operationParameters && operationParameters.hasOwnProperty(paramName)) {
							paramValue = operationParameters[paramName] as string;
						} 
						// Then try resource-specific ID parameters
						else if (resource === 'company' && paramName === 'id') {
							const companyId = this.getNodeParameter('companyId', i, '') as string;
							if (companyId) paramValue = companyId;
						} 
						else if (resource === 'agent' && paramName === 'id') {
							const agentId = this.getNodeParameter('agentId', i, '') as string;
							if (agentId) paramValue = agentId;
						}
						else if (resource === 'credentials' && paramName === 'id') {
							const credentialId = this.getNodeParameter('credentialId', i, '') as string;
							if (credentialId) paramValue = credentialId;
						}
						else if (resource === 'discoverySettings' && paramName === 'id') {
							const settingId = this.getNodeParameter('discoverySettingId', i, '') as string;
							if (settingId) paramValue = settingId;
						}
						else if (resource === 'asset' && paramName === 'id') {
							const assetId = this.getNodeParameter('assetId', i, '') as string;
							if (assetId) paramValue = assetId;
						}
						// If no value found, try to get it from the query parameters
						else if (queryParameters && typeof queryParameters === 'object' && queryParameters !== null) {
							if (queryParameters.hasOwnProperty(paramName)) {
								paramValue = queryParameters[paramName] as string;
							}
						}
						
						if (paramValue) {
							endpoint = endpoint.replace(param, paramValue);
						} else {
							throw new NodeOperationError(
								this.getNode(),
								`Parameter ${paramName} is required for this operation but was not provided`,
								{ itemIndex: i },
							);
						}
					}
				}

				// Get credentials
				const credentials = await this.getCredentials('connectSecureApi') as IDataObject;

				// Prepare the request options
				const options: IHttpRequestOptions = {
					method: operationDetails.method as IHttpRequestMethods,
					url: `${credentials.baseUrl as string}${endpoint}`,
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						'X-Tenant': credentials.tenant as string,
						'X-USER-ID': credentials.userId as string,
					},
					json: true,
				};

				// Add query parameters if provided
				if (queryParameters && Object.keys(queryParameters).length > 0) {
					options.qs = queryParameters;
				}

				// Add body parameters for POST, PUT, PATCH methods
				if (['POST', 'PUT', 'PATCH'].includes(operationDetails.method)) {
					// If operation has specific parameters, use those for the body
					if (hasOperationParameters && Object.keys(operationParameters).length > 0) {
						options.body = { data: operationParameters };
					}
					// Otherwise use the generic body parameters if provided
					else if (bodyParameters && Object.keys(bodyParameters).length > 0) {
						const bodyParams = bodyParameters as IDataObject;
						
						if (bodyParams.hasOwnProperty('jsonRequestBody') && bodyParams.jsonRequestBody) {
							// If JSON body is provided, parse it
							try {
								options.body = JSON.parse(bodyParams.jsonRequestBody as string);
							} catch (error) {
								throw new NodeOperationError(
									this.getNode(),
									'Invalid JSON in request body: ' + (error as Error).message,
									{ itemIndex: i },
								);
							}
						} else {
							// Otherwise use the parameters as is
							options.body = { data: bodyParams };
						}
						
						// Add resource-specific ID to body if needed
						if (options.body && typeof options.body === 'object') {
							const bodyObj = options.body as IDataObject;
							if (bodyObj.hasOwnProperty('data')) {
								switch (resource) {
									case 'company':
										if (this.getNodeParameter('companyId', i, null)) {
											bodyObj.id = this.getNodeParameter('companyId', i, '');
										}
										break;
									case 'agent':
										if (this.getNodeParameter('agentId', i, null)) {
											bodyObj.id = this.getNodeParameter('agentId', i, '');
										}
										break;
									case 'credentials':
										if (this.getNodeParameter('credentialId', i, null)) {
											bodyObj.id = this.getNodeParameter('credentialId', i, '');
										}
										break;
									case 'discoverySettings':
										if (this.getNodeParameter('discoverySettingId', i, null)) {
											bodyObj.id = this.getNodeParameter('discoverySettingId', i, '');
										}
										break;
									case 'asset':
										if (this.getNodeParameter('assetId', i, null)) {
											bodyObj.id = this.getNodeParameter('assetId', i, '');
										}
										break;
									case 'agentCredentialsMapping':
										if (this.getNodeParameter('mappingId', i, null)) {
											bodyObj.id = this.getNodeParameter('mappingId', i, '');
										}
										break;
									case 'agentDiscoverySettingsMapping':
										if (this.getNodeParameter('mappingId', i, null)) {
											bodyObj.id = this.getNodeParameter('mappingId', i, '');
										}
										break;
									case 'integration':
										if (this.getNodeParameter('integrationCredentialId', i, null)) {
											bodyObj.id = this.getNodeParameter('integrationCredentialId', i, '');
										}
										break;
									case 'vulnerability':
										if (this.getNodeParameter('vulnerabilityId', i, null)) {
											bodyObj.id = this.getNodeParameter('vulnerabilityId', i, '');
										}
										break;
									case 'reportBuilder':
										if (operation === 'updateStandardReportSettings') {
											// No ID needed for this operation
										}
										break;
									case 'adInformation':
									case 'azureInformation':
									case 'assetDetails':
									case 'linuxInformation':
									case 'eventInformation':
									case 'userStatistics':
									case 'compliance':
										// These resources primarily use GET operations
										break;
								}
							}
						}
					} else {
						// If no body parameters provided but method requires a body, use an empty data object
						options.body = { data: {} };
					}
				}

				// For DELETE operations, we don't need a body as the ID is in the URL
				if (operationDetails.method === 'DELETE') {
					// Empty body for DELETE operations
					options.body = {};
				}

				// Get OAuth2 token and add it to headers
				const oAuth2Options = await this.getCredentials('oAuth2Api');
				const token = await this.getNodeParameter('oAuth2Api', 0) as string;
				options.headers!.Authorization = `Bearer ${token}`;

				// Make the API request
				const responseData = await this.helpers.request(options);

				// Process the response
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
