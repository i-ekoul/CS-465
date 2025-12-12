# Travlr Getaways - Full Stack Web Application

A comprehensive full stack web application serving both customer-facing and administrative interfaces for a travel booking platform. This project demonstrates proficiency in Express.js server-side rendering, Angular single-page applications, MongoDB database integration, RESTful API design, and secure authentication.

## Project Overview

Travlr Getaways is a full stack web application built with Node.js/Express.js backend and Angular frontend. The application features:

- **Customer-facing website**: Server-rendered pages using Express.js and Handlebars templates
- **Administrative interface**: Angular single-page application (SPA) for managing trips
- **RESTful API**: JSON-based API endpoints for data operations
- **Secure authentication**: JWT-based authentication system for admin access
- **MongoDB database**: NoSQL database for flexible data storage

## Technology Stack

- **Backend**: Node.js, Express.js, Handlebars (hbs)
- **Frontend**: Angular 17, TypeScript, RxJS
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **API**: RESTful JSON API

## Project Structure

```
travlr/
├── app_server/          # Server-side rendering (Express + Handlebars)
│   ├── controllers/     # MVC controllers
│   ├── models/          # Mongoose models and database connection
│   ├── routes/          # Express routes
│   └── views/           # Handlebars templates
├── app_api/             # RESTful API layer
│   ├── controllers/     # API controllers
│   ├── middleware/      # Authentication middleware
│   ├── models/          # User model
│   └── routes/          # API routes
├── admin/               # Angular SPA admin application
│   └── src/app/         # Angular components, services, models
├── public/              # Static assets (CSS, images)
└── bin/www              # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remotely)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Angular admin dependencies:
   ```bash
   cd admin
   npm install
   cd ..
   ```

4. Seed the database with trips:
   ```bash
   node app_server/models/seed.js
   ```

5. Seed the admin user:
   ```bash
   npm run seed:user
   ```

### Running the Application

1. Start the Express server:
   ```bash
   npm start
   ```
   Server runs on `http://localhost:3000`

2. Start the Angular admin app (in a separate terminal):
   ```bash
   cd admin
   npm start
   ```
   Admin app runs on `http://localhost:4200`

### Admin Credentials

- **Email**: `admin@example.com`
- **Password**: `P@ssw0rd`

---

## Architecture

### Compare and Contrast Frontend Development Types

This project demonstrates three distinct frontend development approaches, each serving different purposes:

#### 1. Express HTML (Server-Side Rendering with Handlebars)

The customer-facing website uses **Express.js with Handlebars templates** for server-side rendering. This approach is implemented in the `app_server/` directory, where:

- **Server-side rendering**: HTML is generated on the server using Handlebars templates (`app_server/views/*.hbs`)
- **MVC architecture**: Controllers (`app_server/controllers/`) fetch data from MongoDB and pass it to views
- **Template engine**: Handlebars (hbs) provides dynamic content injection and partials for reusable components
- **Full page reloads**: Each navigation triggers a server request and full page refresh

**Example**: The travel page (`/travel`) renders trips from MongoDB using the `travel.hbs` template, which receives trip data from `app_server/controllers/travel.js`. The server compiles the template with data and sends complete HTML to the client.

**Advantages**: 
- SEO-friendly (search engines can crawl fully rendered HTML)
- Fast initial page load
- Works without JavaScript enabled
- Simple to implement for content-heavy sites

**Disadvantages**:
- Full page reloads create slower perceived performance
- More server load
- Less interactive user experience

#### 2. JavaScript (Client-Side Scripting)

**JavaScript** is used throughout the application in different contexts:

- **Backend JavaScript**: Node.js/Express.js server code (`app.js`, controllers, routes)
- **Frontend JavaScript**: Vanilla JavaScript could be added to Handlebars templates for interactivity
- **API communication**: JavaScript handles HTTP requests in the Angular SPA

**Example**: The Express server uses JavaScript for routing (`app_server/routes/index.js`), database queries (`app_api/controllers/trips.js`), and middleware functions (`app_api/middleware/auth.js`).

#### 3. Single-Page Application (SPA) - Angular

The administrative interface is built as an **Angular SPA** located in the `admin/` directory. This approach:

- **Client-side rendering**: Angular renders components in the browser using TypeScript
- **No page reloads**: Navigation happens client-side using Angular Router
- **Component-based architecture**: Reusable components like `TripCardComponent` encapsulate UI and logic
- **Reactive programming**: Uses RxJS Observables for asynchronous data handling

**Example**: The trip list page (`/trips`) loads data via HTTP GET request to `/api/trips`, Angular renders `TripCardComponent` instances for each trip, and users can navigate to edit/add pages without full page reloads.

**Advantages**:
- Fast, seamless user experience after initial load
- Rich interactivity without page refreshes
- Better for complex, application-like interfaces
- Separation of frontend and backend concerns

**Disadvantages**:
- Requires JavaScript enabled
- Initial load can be slower (must download Angular framework)
- SEO challenges (though solvable with SSR)
- More complex development setup

**Comparison Summary**:

| Feature | Express HTML | JavaScript | Angular SPA |
|---------|-------------|------------|------------|
| Rendering | Server-side | Both | Client-side |
| Page Reloads | Yes | Depends | No |
| SEO | Excellent | Good | Challenging |
| Interactivity | Limited | Moderate | High |
| Best For | Content sites | General use | Web apps |

The project strategically uses **Express HTML for customer-facing content** (better SEO, simpler) and **Angular SPA for admin interface** (better UX for complex operations).

### Why MongoDB (NoSQL Database)?

The backend uses **MongoDB**, a NoSQL document database, for several key reasons:

1. **Flexible Schema**: MongoDB's document-based structure allows for flexible data models. The Trip schema (`app_server/models/trip.js`) can easily evolve without rigid migrations. Fields can be added or modified without complex ALTER TABLE statements.

2. **JSON-like Documents**: MongoDB stores data as BSON (Binary JSON), which maps naturally to JavaScript objects. This creates seamless integration with Node.js/Express.js, where data flows as JavaScript objects without complex ORM mapping layers.

3. **Horizontal Scalability**: MongoDB is designed for horizontal scaling through sharding, making it suitable for applications that may need to scale across multiple servers as traffic grows.

4. **Rapid Development**: The Mongoose ODM provides an intuitive API for database operations. For example, creating a trip is as simple as `new Trip(req.body)` and `trip.save()`, without writing SQL queries.

5. **Nested Data Structures**: The Trip model can easily accommodate nested or complex data structures. While the current schema is relatively flat, MongoDB can handle arrays and nested objects naturally if requirements evolve.

6. **JavaScript Ecosystem Integration**: MongoDB fits perfectly into the JavaScript/Node.js ecosystem. The same language (JavaScript) is used for server logic, database queries, and data manipulation, reducing context switching.

**Example**: In `app_api/controllers/trips.js`, database operations are straightforward:
```javascript
const trip = await Trip.findOne({ code: req.params.tripCode }).exec();
```

This query is intuitive and readable compared to SQL JOIN operations, especially for the application's use case where relationships are simple.

---

## Functionality

### JSON: Bridging Frontend and Backend

**JSON (JavaScript Object Notation)** serves as the critical data interchange format that ties together the frontend and backend development pieces. Understanding the relationship between JSON and JavaScript is fundamental to this full stack application.

#### JSON vs JavaScript

**JSON** is a lightweight data-interchange format derived from JavaScript object literal syntax, but with important differences:

- **JSON is a data format**: It's a string representation of data that can be transmitted over networks
- **JavaScript is a programming language**: It includes functions, variables, and executable code
- **JSON syntax restrictions**: JSON cannot contain functions, undefined values, or comments, while JavaScript objects can
- **JSON is language-independent**: While derived from JavaScript, JSON can be parsed by any programming language

**Example of JSON**:
```json
{
  "code": "OCEAN",
  "name": "Ocean Getaway",
  "length": 5,
  "start": "2025-06-01T00:00:00.000Z"
}
```

**Example of JavaScript object** (similar but can include functions):
```javascript
{
  code: "OCEAN",
  name: "Ocean Getaway",
  length: 5,
  start: new Date(),
  formatDate: function() { /* ... */ }  // Not allowed in JSON
}
```

#### How JSON Ties Frontend and Backend Together

In this application, JSON acts as the universal language for data exchange:

1. **API Communication**: The Angular SPA (`admin/src/app/services/trip-data.service.ts`) sends HTTP requests with JSON payloads:
   ```typescript
   addTrip(trip: Trip): Observable<Trip> {
     return this.http.post<Trip>(this.apiBaseUrl, trip, {
       headers: this.getAuthHeaders()
     });
   }
   ```
   The `trip` object is automatically serialized to JSON by Angular's HttpClient.

2. **Backend Processing**: Express.js receives JSON in request bodies (`app_api/controllers/trips.js`):
   ```javascript
   module.exports.tripsCreate = async function(req, res) {
     const trip = new Trip(req.body);  // req.body is parsed JSON
     const savedTrip = await trip.save();
     res.status(201).json(savedTrip);  // Response sent as JSON
   };
   ```

3. **Database Storage**: MongoDB stores documents in BSON (Binary JSON), which seamlessly converts to/from JSON:
   ```javascript
   const trips = await Trip.find({}).exec();  // Returns JavaScript objects
   res.status(200).json(trips);  // Converted to JSON string for HTTP response
   ```

4. **Type Safety**: TypeScript interfaces (`admin/src/app/models/trip.ts`) ensure type consistency:
   ```typescript
   export interface Trip {
     _id?: string;
     code: string;
     name: string;
     length: number;
     // ... matches JSON structure from API
   }
   ```

**The JSON Flow**:
```
Angular Component → JSON HTTP Request → Express Middleware → 
JSON Parsing → Mongoose Model → MongoDB (BSON) → 
Mongoose Document → JSON Response → Angular Service → TypeScript Object
```

This seamless JSON flow enables the frontend and backend to communicate effectively, with JSON serving as the universal data format that both sides understand.

### Code Refactoring and Reusable UI Components

Throughout the development process, several refactoring efforts improved functionality and efficiency:

#### 1. Separation of Concerns: API Layer Refactoring

**Initial Implementation**: API routes were mixed with server-side rendering routes in `app_server/routes/trips.js`.

**Refactoring**: Created dedicated `app_api/` directory structure separating API concerns from website rendering:

- **Before**: API logic intertwined with view rendering logic
- **After**: Clean separation with `app_api/controllers/`, `app_api/routes/`, and `app_api/middleware/`

**Benefits**:
- **Maintainability**: API and website logic can evolve independently
- **Testability**: API endpoints can be tested without view rendering concerns
- **Scalability**: API can serve multiple clients (Angular SPA, mobile apps, external integrations)
- **Clarity**: Clear distinction between customer-facing routes (`app_server/`) and API routes (`app_api/`)

**Example**: The API controller (`app_api/controllers/trips.js`) focuses solely on data operations and JSON responses, while the travel controller (`app_server/controllers/travel.js`) handles view rendering.

#### 2. Error Handling Refactoring

**Initial Implementation**: Basic error handling with generic messages.

**Refactoring**: Enhanced error handling with comprehensive HTTP status codes and descriptive messages:

```javascript
// Before: Generic error
catch (err) {
  res.status(500).json({ error: err.message });
}

// After: Detailed error handling
catch (err) {
  if (err.name === 'ValidationError') {
    res.status(400).json({ 
      error: 'Validation error',
      message: err.message 
    });
  } else if (err.code === 11000) {
    res.status(400).json({ 
      error: 'Bad request',
      message: 'Trip code must be unique'
    });
  } else {
    res.status(500).json({ 
      error: 'Internal server error',
      message: err.message 
    });
  }
}
```

**Benefits**:
- **Better debugging**: Specific error types help identify issues quickly
- **Improved UX**: Frontend can handle different error types appropriately
- **API clarity**: Consumers understand what went wrong and why

#### 3. Reusable UI Components: TripCardComponent

**Implementation**: Created `TripCardComponent` (`admin/src/app/trips/trip-card.component.ts`) as a reusable component for displaying trip information.

**Component Structure**:
```typescript
@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip!: Trip;           // Receives trip data
  @Output() delete = new EventEmitter<string>();  // Emits delete events
  
  onEdit(): void { /* ... */ }
  onDelete(): void { /* ... */ }
  formatDate(date: Date | string): string { /* ... */ }
}
```

**Usage**: The `TripListComponent` uses multiple instances:
```html
<app-trip-card 
  *ngFor="let trip of trips" 
  [trip]="trip"
  (delete)="onDelete($event)">
</app-trip-card>
```

**Benefits of Reusable Components**:

1. **Code Reusability**: The trip card UI and logic are defined once but used multiple times. If the card design needs to change, only one file needs updating.

2. **Consistency**: All trip cards across the application have identical appearance and behavior, ensuring a consistent user experience.

3. **Maintainability**: Bug fixes or enhancements to trip cards only require changes in one component file.

4. **Separation of Concerns**: The `TripListComponent` focuses on managing the list of trips, while `TripCardComponent` handles individual trip display logic.

5. **Testability**: Components can be unit tested independently. The card component can be tested with mock trip data without involving the list component.

6. **Scalability**: If trip cards are needed elsewhere (e.g., a dashboard or search results), the same component can be reused without duplication.

**Real-World Impact**: When adding date formatting functionality, it was implemented once in `TripCardComponent.formatDate()`, and all trip cards automatically benefited from consistent date display.

This component-based architecture follows Angular best practices and demonstrates how reusable UI components reduce code duplication, improve maintainability, and create a more scalable application structure.

---

## Testing

### API Testing: Methods, Endpoints, and Security

Testing a full stack application requires understanding the interaction between HTTP methods, API endpoints, and security layers. This application implements comprehensive API testing strategies.

#### HTTP Methods and Endpoints

The application uses **RESTful API design** with standard HTTP methods for different operations:

**GET Methods** (Read Operations):
- `GET /api/trips` - Retrieves all trips (public endpoint)
- `GET /api/trips/:tripCode` - Retrieves a single trip by code (public endpoint)

**Testing GET endpoints**:
- Verify successful retrieval with 200 status code
- Test with valid trip codes
- Test with invalid/non-existent trip codes (should return 404)
- Verify JSON response structure matches expected format
- Test empty database scenarios (should return empty array, not error)

**POST Methods** (Create Operations):
- `POST /api/trips` - Creates a new trip (protected endpoint)
- `POST /api/login` - Authenticates user and returns JWT token (public endpoint)

**Testing POST endpoints**:
- Verify successful creation with 201 status code
- Test validation: missing required fields should return 400
- Test duplicate prevention: creating trip with existing code should return 400
- Verify created resource is returned in response
- Test with invalid data types (e.g., string instead of number for length)

**PUT Methods** (Update Operations):
- `PUT /api/trips/:tripCode` - Updates an existing trip (protected endpoint)

**Testing PUT endpoints**:
- Verify successful update with 200 status code
- Test partial updates (only some fields provided)
- Test updating non-existent trip (should return 404)
- Verify updated resource is returned in response
- Test validation errors (e.g., invalid date format)

**DELETE Methods** (Delete Operations):
- `DELETE /api/trips/:tripCode` - Deletes a trip (protected endpoint)

**Testing DELETE endpoints**:
- Verify successful deletion with 204 No Content status
- Test deleting non-existent trip (should return 404)
- Verify trip is actually removed from database
- Test idempotency (deleting twice should handle gracefully)

#### Security Testing Challenges

The application implements **JWT-based authentication** (`app_api/middleware/auth.js`), which adds complexity to testing:

**Authentication Flow Testing**:

1. **Login Endpoint Testing** (`POST /api/login`):
   - Test with valid credentials → should return 200 with JWT token
   - Test with invalid email → should return 401 Unauthorized
   - Test with invalid password → should return 401 Unauthorized
   - Test with missing email/password → should return 400 Bad Request
   - Verify token structure (should be valid JWT)
   - Verify token expiration (tokens expire after 1 hour)

2. **Protected Endpoint Testing** (POST, PUT, DELETE `/api/trips`):

   **Without Authentication**:
   - Test without Authorization header → should return 401 Unauthorized
   - Test with malformed Authorization header → should return 401
   - Verify error message: "No token provided"

   **With Invalid Token**:
   - Test with expired token → should return 401 with "Invalid or expired token"
   - Test with tampered token → should return 401
   - Test with token signed with wrong secret → should return 401

   **With Valid Token**:
   - Test successful operation with valid token → should return success status
   - Verify token is extracted correctly from `Authorization: Bearer <token>` header
   - Test that user information is attached to request (`req.user`)

**Security Testing Considerations**:

1. **Token Storage**: In the Angular SPA, tokens are stored in `localStorage`. Testing must verify:
   - Token is stored after successful login
   - Token is retrieved and included in subsequent requests
   - Token is cleared on logout

2. **Route Guards**: Angular route guards (`admin/src/app/auth/auth.guard.ts`) protect admin routes:
   - Test accessing protected route without login → should redirect to `/login`
   - Test accessing protected route with valid token → should allow access
   - Test accessing protected route with expired token → should redirect to login

3. **CORS Configuration**: The Express server enables CORS for the Angular app (`app.js`):
   ```javascript
   app.use(cors({
     origin: 'http://localhost:4200',
     credentials: true
   }));
   ```
   Testing must verify CORS headers are present in API responses.

4. **Password Security**: Passwords are hashed using bcryptjs (`app_api/models/user.js`):
   - Verify passwords are never returned in API responses
   - Verify password comparison uses secure hashing
   - Test that plain text passwords are not stored in database

**Testing Tools and Methods**:

- **Manual Testing**: Using browser DevTools to inspect network requests, verify headers, and check responses
- **Postman/Insomnia**: Testing API endpoints directly with different scenarios (valid/invalid tokens, various HTTP methods)
- **Angular Testing**: Unit tests for services (`TripDataService`, `AuthService`) and components
- **Integration Testing**: Testing the full flow from Angular component → HTTP request → Express middleware → MongoDB → Response

**Example Test Scenario**:

```
1. Login with valid credentials → Receive JWT token
2. Store token in localStorage
3. Make POST /api/trips request with token in Authorization header
4. Verify 201 Created response
5. Make GET /api/trips request (public, no token needed)
6. Verify new trip appears in list
7. Logout → Clear token
8. Attempt POST /api/trips without token → Verify 401 Unauthorized
```

This comprehensive testing approach ensures that methods, endpoints, and security layers work together correctly, providing a robust and secure full stack application.

---

## Reflection

### Professional Growth and Career Development

This course has been instrumental in advancing my professional goals and developing critical skills for a career in full stack web development. The hands-on experience building a complete application from server-side rendering to modern SPA architecture has provided practical, marketable skills.

#### Skills Learned and Developed

**1. Full Stack Architecture Understanding**

Through building Travlr Getaways, I've gained deep understanding of how frontend and backend systems integrate:

- **Server-Side Rendering**: Learned Express.js with Handlebars for SEO-friendly, content-driven websites
- **API Design**: Developed RESTful APIs with proper HTTP methods, status codes, and error handling
- **Client-Side Applications**: Built Angular SPAs with component-based architecture, routing, and reactive programming
- **Database Integration**: Implemented MongoDB with Mongoose, understanding NoSQL document storage and querying

This comprehensive experience makes me capable of working on any layer of a web application, from database design to user interface implementation.

**2. Modern JavaScript and TypeScript**

The project required proficiency in multiple JavaScript contexts:

- **Node.js/Express.js**: Server-side JavaScript for backend logic, routing, and middleware
- **TypeScript**: Type-safe development in Angular, improving code quality and catching errors early
- **ES6+ Features**: Async/await, arrow functions, destructuring, and modern JavaScript patterns
- **RxJS**: Reactive programming with Observables for handling asynchronous operations

These skills are directly applicable to modern web development positions, as JavaScript/TypeScript dominate the industry.

**3. Security Implementation**

Implementing JWT authentication taught critical security concepts:

- **Authentication vs Authorization**: Understanding user identity verification and permission checking
- **Token-Based Security**: JWT implementation, token expiration, and secure storage
- **Password Hashing**: Using bcryptjs for secure password storage
- **Middleware Patterns**: Protecting routes with authentication middleware
- **CORS Configuration**: Understanding cross-origin resource sharing for API security

Security is a top priority for employers, and hands-on experience with authentication systems is highly valuable.

**4. Code Organization and Best Practices**

The project emphasized software engineering principles:

- **Separation of Concerns**: Organizing code into logical modules (app_server, app_api, admin)
- **MVC Architecture**: Implementing Model-View-Controller pattern for maintainable code
- **Component Reusability**: Creating reusable UI components (TripCardComponent)
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Code Refactoring**: Improving code quality through iterative refactoring

These practices demonstrate professional-level code organization that employers value.

**5. Database Design and Management**

Working with MongoDB provided practical database experience:

- **Schema Design**: Creating Mongoose schemas with validation and indexes
- **CRUD Operations**: Implementing Create, Read, Update, Delete operations
- **Query Optimization**: Using indexes for performance (code and name fields indexed)
- **Data Seeding**: Creating seed scripts for development and testing

Database skills are essential for backend development roles.

**6. API Development and Testing**

Building and testing RESTful APIs taught:

- **REST Principles**: Proper use of HTTP methods (GET, POST, PUT, DELETE)
- **Endpoint Design**: Creating intuitive, consistent API endpoints
- **Request/Response Handling**: Parsing JSON requests and sending JSON responses
- **Error Responses**: Standardized error formats for API consumers
- **Testing Strategies**: Testing endpoints with various scenarios and security considerations

API development skills are crucial as most modern applications rely on APIs for data exchange.

#### Marketability and Career Impact

**Immediate Applicability**: The skills learned directly translate to job requirements I see in postings for:
- Full Stack Developer
- Backend Developer (Node.js/Express)
- Frontend Developer (Angular/TypeScript)
- API Developer
- Web Application Developer

**Portfolio Value**: This project demonstrates:
- Complete application development lifecycle
- Multiple technology integration
- Security implementation
- Professional code organization
- Problem-solving through refactoring

**Confidence Building**: Successfully building a secure, functional full stack application from scratch has built confidence in my ability to:
- Learn new technologies quickly
- Debug complex issues across the stack
- Make architectural decisions
- Implement security best practices
- Write maintainable, professional code

**Foundation for Growth**: The comprehensive understanding of full stack development provides a solid foundation for:
- Learning additional frameworks (React, Vue, etc.)
- Understanding cloud deployment (AWS, Azure, etc.)
- Implementing advanced features (real-time updates, microservices, etc.)
- Contributing to larger codebases
- Mentoring junior developers

#### Professional Goals Alignment

This course has directly supported my professional goals by:

1. **Building Practical Experience**: Creating a real, working application rather than just theoretical knowledge
2. **Demonstrating Competency**: The project serves as proof of my abilities to potential employers
3. **Understanding Industry Standards**: Learning patterns and practices used in professional development
4. **Problem-Solving Skills**: Working through challenges like authentication, CORS, and component architecture
5. **Technology Versatility**: Experience with multiple technologies makes me adaptable to different tech stacks

The combination of theoretical understanding and hands-on implementation has prepared me to contribute meaningfully to development teams and take on full stack development challenges in my career. This course has not just taught me technologies—it has taught me how to think like a developer, solve problems systematically, and build applications that are secure, maintainable, and scalable.

---

## API Documentation

### Public Endpoints (No Authentication Required)

- `GET /api/trips` - Get all trips
- `GET /api/trips/:tripCode` - Get single trip by code
- `POST /api/login` - Authenticate and receive JWT token

### Protected Endpoints (Authentication Required)

All protected endpoints require `Authorization: Bearer <token>` header.

- `POST /api/trips` - Create new trip
- `PUT /api/trips/:tripCode` - Update trip
- `DELETE /api/trips/:tripCode` - Delete trip

### Authentication

Send POST request to `/api/login` with JSON body:
```json
{
  "email": "admin@example.com",
  "password": "P@ssw0rd"
}
```

Response includes JWT token:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Include token in Authorization header for protected endpoints:
```
Authorization: Bearer <token>
```

## Development Notes

- See `CHANGELOG.md` for detailed development history
- See `docs/MODULE_SEVEN_SECURITY.md` for security implementation details
- See `admin/README.md` for Angular admin app setup

## License

This project was developed for educational purposes as part of CS-465 at SNHU.
