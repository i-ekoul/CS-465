# Travlr Admin - Angular SPA

This is the Angular admin Single Page Application (SPA) for managing trips in the Travlr Getaways project.

## Setup

1. Install dependencies:
```bash
cd admin
npm install
```

2. Start the Angular development server:
```bash
npm start
```

The app will be available at `http://localhost:4200`

## Configuration

- **API Base URL**: Configured in `src/environments/environment.ts` (development) and `src/environments/environment.prod.ts` (production)
- **Proxy**: Configured in `proxy.conf.json` to forward `/api` requests to `http://localhost:3000` during development

## Project Structure

```
admin/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── trip.ts              # Trip interface
│   │   ├── services/
│   │   │   └── trip-data.service.ts  # HTTP service for API calls
│   │   ├── trips/
│   │   │   ├── trip-list.component.*    # List view component
│   │   │   ├── trip-card.component.*    # Card component
│   │   │   ├── trip-add.component.*     # Add form component
│   │   │   └── trip-edit.component.*    # Edit form component
│   │   ├── app.component.*          # Root component with navigation
│   │   ├── app.module.ts            # App module
│   │   └── app-routing.module.ts    # Routing configuration
│   ├── environments/
│   │   ├── environment.ts           # Development environment
│   │   └── environment.prod.ts      # Production environment
│   └── main.ts                      # Application entry point
├── angular.json                     # Angular CLI configuration
├── package.json                     # Dependencies
└── proxy.conf.json                  # Proxy configuration for API
```

## Routes

- `/trips` - Trip list view
- `/trips/add` - Add new trip form
- `/trips/:code/edit` - Edit trip form

## API Integration

All API calls are made through the `TripDataService` which uses the following endpoints:

- `GET /api/trips` - Get all trips
- `GET /api/trips/:tripCode` - Get single trip
- `POST /api/trips` - Create new trip
- `PUT /api/trips/:tripCode` - Update trip
- `DELETE /api/trips/:tripCode` - Delete trip

## Development

Make sure the Express backend is running on `http://localhost:3000` before starting the Angular app.

