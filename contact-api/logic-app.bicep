@description('Azure region for all resources')
param location string

@description('Name of the Logic App')
param logicAppName string

@description('Name of the Gmail API connection')
param gmailConnectionName string

@description('Allowed CORS origin (your frontend domain)')
param allowedOrigin string = 'https://impulsecommunaute.com'

// Gmail API connection (OAuth2 — requires one-time manual authorization in Azure Portal)
resource gmailConnection 'Microsoft.Web/connections@2016-06-01' = {
  name: gmailConnectionName
  location: location
  properties: {
    displayName: 'Gmail - Impulse'
    api: {
      id: subscriptionResourceId('Microsoft.Web/locations/managedApis', location, 'gmail')
    }
  }
}

// Logic App Consumption workflow
resource logicApp 'Microsoft.Logic/workflows@2019-05-01' = {
  name: logicAppName
  location: location
  properties: {
    state: 'Enabled'
    definition: {
      '$schema': 'https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#'
      contentVersion: '1.0.0.0'
      parameters: {
        '$connections': {
          defaultValue: {}
          type: 'Object'
        }
      }
      triggers: {
        manual: {
          type: 'Request'
          kind: 'Http'
          inputs: {
            method: 'POST'
            schema: {
              type: 'object'
              properties: {
                name: { type: 'string' }
                email: { type: 'string' }
                profession: { type: 'string' }
                age: { type: 'string' }
                location: { type: 'string' }
                message: { type: 'string' }
              }
              required: ['name', 'email', 'profession', 'age', 'location']
            }
          }
        }
      }
      actions: {
        // Handle CORS preflight (OPTIONS) — check method and branch
        Check_If_Options: {
          type: 'If'
          expression: {
            and: [
              {
                equals: [
                  '@coalesce(triggerOutputs()?[\'headers\']?[\'Access-Control-Request-Method\'], triggerOutputs()?[\'headers\']?[\'access-control-request-method\'], \'\')'
                  ''
                ]
              }
            ]
          }
          actions: {
            // Normal POST flow
            Parse_JSON: {
              type: 'ParseJson'
              inputs: {
                content: '@triggerBody()'
                schema: {
                  type: 'object'
                  properties: {
                    name: { type: 'string' }
                    email: { type: 'string' }
                    profession: { type: 'string' }
                    age: { type: 'string' }
                    location: { type: 'string' }
                    message: { type: 'string' }
                  }
                }
              }
              runAfter: {}
            }
            Send_Email: {
              type: 'ApiConnection'
              inputs: {
                host: {
                  connection: {
                    name: '@parameters(\'$connections\')[\'gmail\'][\'connectionId\']'
                  }
                }
                method: 'post'
                path: '/v2/Mail'
                body: {
                  To: 'marina@marinaserr.com'
                  Subject: 'Nouvelle demande Impulse - @{body(\'Parse_JSON\')?[\'name\']}'
                  Body: '<h2>Nouvelle demande de contact</h2><p><b>Nom :</b> @{body(\'Parse_JSON\')?[\'name\']}</p><p><b>Email :</b> @{body(\'Parse_JSON\')?[\'email\']}</p><p><b>Profession :</b> @{body(\'Parse_JSON\')?[\'profession\']}</p><p><b>&Acirc;ge :</b> @{body(\'Parse_JSON\')?[\'age\']}</p><p><b>Localisation :</b> @{body(\'Parse_JSON\')?[\'location\']}</p><hr><p><b>Message :</b></p><p>@{coalesce(body(\'Parse_JSON\')?[\'message\'], \'(aucun message)\')}</p>'
                }
              }
              runAfter: {
                Parse_JSON: ['Succeeded']
              }
            }
            Response_Success: {
              type: 'Response'
              kind: 'Http'
              inputs: {
                statusCode: 200
                headers: {
                  'Content-Type': 'application/json'
                  'Access-Control-Allow-Origin': allowedOrigin
                  'Access-Control-Allow-Methods': 'POST, OPTIONS'
                  'Access-Control-Allow-Headers': 'Content-Type'
                }
                body: {
                  status: 'ok'
                }
              }
              runAfter: {
                Send_Email: ['Succeeded']
              }
            }
            Response_Error: {
              type: 'Response'
              kind: 'Http'
              inputs: {
                statusCode: 500
                headers: {
                  'Content-Type': 'application/json'
                  'Access-Control-Allow-Origin': allowedOrigin
                  'Access-Control-Allow-Methods': 'POST, OPTIONS'
                  'Access-Control-Allow-Headers': 'Content-Type'
                }
                body: {
                  status: 'error'
                  message: 'Failed to send email'
                }
              }
              runAfter: {
                Send_Email: ['Failed', 'TimedOut']
              }
            }
          }
          else: {
            actions: {
              // CORS preflight response
              Response_Preflight: {
                type: 'Response'
                kind: 'Http'
                inputs: {
                  statusCode: 200
                  headers: {
                    'Access-Control-Allow-Origin': allowedOrigin
                    'Access-Control-Allow-Methods': 'POST, OPTIONS'
                    'Access-Control-Allow-Headers': 'Content-Type'
                    'Access-Control-Max-Age': '86400'
                  }
                  body: {}
                }
                runAfter: {}
              }
            }
          }
          runAfter: {}
        }
      }
    }
    parameters: {
      '$connections': {
        value: {
          gmail: {
            connectionId: gmailConnection.id
            connectionName: gmailConnectionName
            id: subscriptionResourceId('Microsoft.Web/locations/managedApis', location, 'gmail')
          }
        }
      }
    }
  }
}

@description('The callback URL for the Logic App HTTP trigger (contains SAS token)')
output triggerUrl string = listCallbackUrl(resourceId('Microsoft.Logic/workflows/triggers', logicAppName, 'manual'), '2019-05-01').value
