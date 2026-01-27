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
                        ↓
                  impulse.rdv@gmail.com → marina@marinaserr.com
```

## Prerequisites

- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli)
- Azure subscription (free tier works)
- Gmail account (`impulse.rdv@gmail.com`)

## First-time deployment

### 1. Create the resource group

```bash
az group create -n impulse-rg -l westeurope
```

### 2. Deploy the Bicep template

```bash
az deployment group create \
  -g impulse-rg \
  -f contact-api/main.bicep \
  --query "properties.outputs.triggerUrl.value" -o tsv
```

Save the output URL — this is the Logic App trigger URL (contains a SAS token for authentication).

### 3. Authorize the Gmail connection

The Gmail connector requires a one-time OAuth2 authorization:

1. Go to the [Azure Portal](https://portal.azure.com)
2. Navigate to **Resource Group** → `impulse-rg` → `gmail-connection`
3. Click **Edit API connection**
4. Click **Authorize** and sign in with `impulse.rdv@gmail.com`
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

### Required GitHub secret

| Secret | Description |
|--------|-------------|
| `IMPULSE_AZURE_CREDENTIALS` | Service Principal JSON for `az login` |

Create the service principal:

```bash
az ad sp create-for-rbac \
  --name "impulse-github-actions" \
  --role contributor \
  --scopes /subscriptions/<subscription-id>/resourceGroups/impulse-rg \
  --json-auth
```

Copy the JSON output and add it as the `IMPULSE_AZURE_CREDENTIALS` secret in the GitHub repository settings.

## Troubleshooting

### Gmail connection expired

Gmail OAuth tokens can expire. Re-authorize in the Azure Portal:
**Resource Group** → `impulse-rg` → `gmail-connection` → **Edit API connection** → **Authorize**

### Logic App not triggering

Check the run history in Azure Portal:
**Resource Group** → `impulse-rg` → `impulse-contact` → **Run history**

### CORS errors

The Logic App includes CORS headers for `https://impulsecommunaute.com`. If your domain changes, update the `allowedOrigin` parameter in `main.bicep`.

## Cost

Logic Apps Consumption: first 4,000 actions/month are free. A contact form with ~100 submissions/month costs **0 EUR**.
