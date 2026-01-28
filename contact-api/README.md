# Contact API — Azure Logic App

Serverless endpoint that receives contact form submissions and sends an email via Gmail.

## Architecture

```
[Contact Form] → POST Logic App HTTP trigger
                        ↓
                  [Azure Logic App (Consumption)]
                    1. Parse JSON
                    2. Send Email (Gmail connector)
                    3. Respond HTTP 200
```

## Prerequisites

- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli)
- Azure subscription (free tier works)
- Gmail account for sending emails

## First-time deployment

### 1. Create the resource group

```bash
az group create -n <RESOURCE_GROUP_NAME> -l westeurope
```

### 2. Deploy the Bicep template

```bash
az deployment group create \
  -g <RESOURCE_GROUP_NAME> \
  -f contact-api/main.bicep \
  --query "properties.outputs.triggerUrl.value" -o tsv
```

Save the output URL — this is the Logic App trigger URL (contains a SAS token for authentication).

### 3. Authorize the Gmail connection

The Gmail connector requires a one-time OAuth2 authorization:

1. Go to the [Azure Portal](https://portal.azure.com)
2. Navigate to **Resource Group** → `<RESOURCE_GROUP_NAME>` → `<GMAIL_CONNECTION_NAME>`
3. Click **Edit API connection**
4. Click **Authorize** and sign in with your Gmail account
5. Click **Save**

### 4. Set the trigger URL in GitHub

Add the trigger URL as a repository variable so the Next.js build can inline it:

```bash
gh variable set NEXT_PUBLIC_IMPULSE_CONTACT_API --body "<trigger-url>"
```

Then update `.github/workflows/deploy.yml` to pass it during build:

```yaml
- name: Build with Next.js
  env:
    NEXT_PUBLIC_IMPULSE_CONTACT_API: ${{ vars.NEXT_PUBLIC_IMPULSE_CONTACT_API }}
  run: pnpm build
```

## Testing

```bash
curl -X POST "<trigger-url>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "profession": "developpeur",
    "age": "25-34",
    "location": "barcelone",
    "message": "Ceci est un test."
  }'
```

Expected response: `{"status":"ok"}`

## CI/CD

The workflow `.github/workflows/deploy-contact-api.yml` automatically deploys on push to `main` when files in `contact-api/` change.

### Required GitHub secrets and variables

| Type | Name | Description |
|------|------|-------------|
| Secret | `IMPULSE_AZURE_CREDENTIALS` | Service Principal JSON for `az login` |
| Variable | `AZURE_RESOURCE_GROUP` | Azure resource group name |
| Variable | `AZURE_LOGIC_APP_NAME` | Logic App name |
| Variable | `AZURE_GMAIL_CONNECTION_NAME` | Gmail API connection name |
| Variable | `ALLOWED_ORIGIN` | Frontend domain for CORS |
| Variable | `IMPULSE_RECIPIENT_EMAIL` | Email address to receive submissions |

Create the service principal:

```bash
az ad sp create-for-rbac \
  --name "<SERVICE_PRINCIPAL_NAME>" \
  --role contributor \
  --scopes /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP_NAME> \
  --json-auth
```

Copy the JSON output and add it as the `IMPULSE_AZURE_CREDENTIALS` secret in the GitHub repository settings.

## Troubleshooting

### Gmail connection expired

Gmail OAuth tokens can expire. Re-authorize in the Azure Portal:
**Resource Group** → `<RESOURCE_GROUP_NAME>` → `<GMAIL_CONNECTION_NAME>` → **Edit API connection** → **Authorize**

### Logic App not triggering

Check the run history in Azure Portal:
**Resource Group** → `<RESOURCE_GROUP_NAME>` → `<LOGIC_APP_NAME>` → **Run history**

### CORS errors

The Logic App includes CORS headers for your frontend domain. If your domain changes, update the `allowedOrigin` parameter in `main.bicep`.

## Cost

Logic Apps Consumption: first 4,000 actions/month are free. A contact form with ~100 submissions/month costs **0 EUR**.
