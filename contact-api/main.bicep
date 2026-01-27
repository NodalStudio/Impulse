targetScope = 'resourceGroup'

@description('Azure region for all resources')
param location string = 'westeurope'

@description('Name of the Logic App')
param logicAppName string = 'impulse-contact'

@description('Name of the Gmail API connection')
param gmailConnectionName string = 'gmail-connection'

@description('Allowed CORS origin (your frontend domain)')
param allowedOrigin string = 'https://impulsecommunaute.com'

@description('Email address that receives contact form submissions')
param recipientEmail string = 'marina@marinaserr.com'

module logicApp 'logic-app.bicep' = {
  name: 'deploy-logic-app'
  params: {
    location: location
    logicAppName: logicAppName
    gmailConnectionName: gmailConnectionName
    allowedOrigin: allowedOrigin
    recipientEmail: recipientEmail
  }
}

#disable-next-line outputs-should-not-contain-secrets
output triggerUrl string = logicApp.outputs.triggerUrl
