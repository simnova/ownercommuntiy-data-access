Using the 3.1.0-beta.1 version of the Azure Maps JavaScript API - [[Docs]](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-arm-maps/3.1.0-beta.1/index.html).
- Beta version of the API is necessary as it supports [creating SAS tokens](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-arm-maps/3.1.0-beta.1/interfaces/accounts.html#listsas).

Notes:
 - To create a SAS token, you first need to add a managed identity to the Maps account.
   - This managed identity needs to have the 
 - Developers/The managed identity for both Maps/Function Apps all will also need to have the following permissions added to their AD Accounts:
    - Azure Maps -> Access Control -> Add role Assignment
      - Azure Maps Contributor
 - It 
 - In development mode you will have to sign in using Azure CLI and likely specify the correct subscription ID.
    -  (for example, `az login --tenant <tenantId>`) [[Docs]](https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli#sign-in-with-a-different-tenant)