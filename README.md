# Leave Application - Angular Frontend

A basic leave management application built with Angular 17. This is the frontend component that will be expanded with Node.js backend, Azure API Management (APIM), and Cosmos DB.

## Project Structure

```
leave-application/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── leave-form/
│   │   │   └── leave-list/
│   │   ├── models/
│   │   │   └── leave.model.ts
│   │   ├── services/
│   │   │   └── leave.service.ts
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   ├── main.ts
│   ├── index.html
│   └── styles.scss
├── Dockerfile
├── azure-pipelines.yml
├── package.json
├── angular.json
└── tsconfig.json
```

## Features

- **Leave Application Form**: Submit new leave requests with employee details, leave type, dates, and reason
- **Leave List**: View all submitted leave applications with status tracking
- **Edit/Delete**: Modify or remove leave applications
- **Status Tracking**: Track leave status (Pending, Approved, Rejected)
- **Responsive Design**: Mobile-friendly UI

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

```bash
npm install
```

## Development

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

```bash
npm run build:prod
```

The build artifacts will be stored in the `dist/` directory.

## Docker Build

```bash
docker build -t leave-application:latest .
docker run -p 8080:8080 leave-application:latest
```

## Azure Deployment

### Prerequisites
- Azure subscription
- Azure App Service
- Azure Container Registry (optional)

### Steps

1. **Create Azure App Service**
   ```bash
   az appservice plan create --name leave-app-plan --resource-group myResourceGroup --sku B1 --is-linux
   az webapp create --resource-group myResourceGroup --plan leave-app-plan --name leave-application-app --runtime "NODE|18-lts"
   ```

2. **Deploy using Azure Pipelines**
   - Push code to Azure DevOps repository
   - Create pipeline from `azure-pipelines.yml`
   - Configure Azure subscription connection
   - Run pipeline

3. **Deploy using Docker**
   ```bash
   az acr build --registry myRegistry --image leave-application:latest .
   az webapp create --resource-group myResourceGroup --plan leave-app-plan --name leave-application-app --deployment-container-image-name myRegistry.azurecr.io/leave-application:latest
   ```

## Future Enhancements

- **Backend API**: Node.js Express server for leave management
- **Database**: Cosmos DB for data persistence
- **API Management**: Azure APIM for API gateway and management
- **Authentication**: Azure AD integration
- **Notifications**: Email notifications for leave status updates
- **Approval Workflow**: Manager approval system
- **Leave Balance**: Track available leave balance

## Environment Configuration

Create `.env` file for environment-specific settings:

```
ANGULAR_APP_API_URL=https://your-api-endpoint.com
ANGULAR_APP_ENV=production
```

## License

MIT
