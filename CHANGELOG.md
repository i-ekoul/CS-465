CHANGELOG
=========

All notable changes to the Travlr Getaways project will be documented in this file.

Emmalie S. Cole | CS-465 @SNHU

---

MODULE 4 - 2025-01-30
---------------------

ADDED:

- Created app_server/models/ directory with database modules:
  * db.js - MongoDB connection module using Mongoose with connection event handlers and graceful shutdown
  * trip.js - Trip schema model with validation (all fields required) and indexes on 'code' and 'name' fields
  * trips.json - Seed data file with 3 sample trips suitable for Travlr Getaways
  * seed.js - Database seeding script that converts date strings to Date objects and inserts trips
- Added Mongoose package dependency to package.json (^8.20.1)
- Created RESTful API endpoints for trips:
  * GET /api/trips - Retrieve all trips in JSON format
  * GET /api/trips/:tripCode - Retrieve single trip by code with 404 error handling
- Created app_server/controllers/trips.js - API controller with tripsList and tripsFindByCode functions
- Created app_server/routes/trips.js - API routes for trips endpoints
- Date formatting logic in travel controller for user-friendly date display

CHANGED:

- Updated app.js:
  * Added database connection initialization (require('./app_server/models/db'))
  * Registered /api/trips route for RESTful API endpoints
- Updated app_server/controllers/travel.js:
  * Changed from static data to async function fetching from MongoDB using Trip.find()
  * Formats dates using toLocaleDateString() for display (startFormatted field)
  * Added error handling with try/catch and console logging
  * Converts Mongoose documents to plain objects for template rendering
- Updated app_server/views/travel.hbs:
  * Changed from hardcoded trips to dynamic {{#each trips}} loop
  * Added conditional check {{#if trips}} to handle empty trip list
  * Displays trip data from MongoDB (name, description, length, startFormatted, perPerson, image)
  * Uses formatted date (startFormatted) instead of raw date object
- Updated package.json:
  * Added mongoose dependency (^8.20.1)

NOTES:

- Module 4 implements MongoDB database integration with Mongoose ODM
- Trip schema includes indexes on 'code' and 'name' fields for faster retrieval
- Start dates are stored using ISO standard date format (Date objects)
- Database collection is named 'trips' as specified
- Seed script removes existing trips before inserting new ones (deleteMany then insertMany)
- Seed script converts date strings from JSON to Date objects before insertion
- API endpoints return JSON data for future Angular SPA integration
- Travel page now uses database data instead of hardcoded JSON
- Date formatting handled in controller for consistent display format
- All API endpoints include proper error handling with appropriate HTTP status codes

---

MODULE 3 - 2025-11-26
---------------------

ADDED:

- Created HBS templates for all remaining pages:
  * rooms.hbs - Rooms page template with dynamic room data
  * meals.hbs - Meals page template with dynamic meal data
  * news.hbs - News page template with dynamic news and tips data
  * about.hbs - About page template with dynamic content sections
  * contact.hbs - Contact page template with dynamic company information
- Added JSON data structures in controllers for dynamic content:
  * Rooms: name, image, description, rate
  * Meals: name, image, special, description
  * News: latestNews array, vacationTips array, featured article with paragraphs
  * About: intro, sections (crews, amenities), community, template details
  * Contact: company information (name, address, telephone, fax)
- Registered Handlebars helper function 'eq' for equality comparisons in templates
- Dynamic page highlighting in navigation (header and footer partials)

CHANGED:

- Updated app_server/controllers/main.js:
  * Converted all page controllers from static HTML file serving to dynamic HBS rendering
  * Added JSON data objects for rooms, meals, news, about, and contact pages
  * Added 'page' parameter to all controllers for navigation highlighting
- Updated app_server/controllers/travel.js:
  * Added 'page' parameter for navigation highlighting
- Updated app_server/views/partials/header.hbs:
  * Made navigation items dynamically highlight based on current page using Handlebars 'eq' helper
- Updated app_server/views/partials/footer.hbs:
  * Made footer navigation items dynamically highlight based on current page using Handlebars 'eq' helper
- Updated app.js:
  * Registered Handlebars 'eq' helper function for template conditionals

REMOVED:

- Removed static HTML file serving from controllers (rooms, meals, news, about, contact)
- All pages now use dynamic HBS templates instead of static HTML files

NOTES:

- Module 3 completes the transition from static HTML to dynamic JSON-driven HBS templates
- All pages now follow MVC architecture with controllers passing JSON data to views
- Navigation highlighting is now dynamic and automatically updates based on current route
- All content is now data-driven, making it easier to update and maintain

---

MODULE 2 - 2025-11-08
---------------------

ADDED:

- Created app_server folder structure following MVC architecture
- Added app_server/controllers/ folder with controllers:
  * main.js - Home page controller
  * travel.js - Travel page controller
- Added app_server/routes/ folder with routes:
  * index.js - Home route (updated to use main controller)
  * travel.js - Travel route (new route for travel page)
- Created Handlebars templates in app_server/views/:
  * index.hbs - Home page template
  * travel.hbs - Travel page template
  * layouts/layout.hbs - Main layout template
- Created Handlebars partials in app_server/views/partials/:
  * header.hbs - Header partial with navigation
  * footer.hbs - Footer partial with links and copyright
- Updated app.js to:
  * Configure views path to app_server/views
  * Register Handlebars partials
  * Register travel route
  * Configure layout path
  * Reorder middleware (routes before static files)
- Added CSS rule to disable pointer events on travel page images (#sites li img)

CHANGED:

- Moved routes/ folder to app_server/routes/
- Moved views/ folder to app_server/views/
- Updated app_server/routes/index.js to use main controller
- Updated image paths in templates to use absolute paths (/images/...)
- Updated CSS path in layout to use absolute path (/css/style.css)
- Updated all navigation links to use routes without .html extensions:
  * Header navigation: /, /travel, /rooms, /meals, /news, /about, /contact
  * Footer navigation: /, /travel, /rooms, /meals, /news, /about, /contact
  * Home page sidebar links: /rooms, /travel, /meals
  * Home page blog links: /news

FIXED:

- Fixed 404 errors when clicking images on travel page by:
  * Removing anchor tags around images in travel.hbs (images are display-only)
  * Removing anchor tags around headings in travel.hbs
  * Adding CSS pointer-events: none to #sites li img to prevent clicks
- Fixed static file serving precedence (routes now take priority over static HTML files)
- Fixed duplicate HTML files in root directory (removed duplicates, kept only in public/)
- Fixed duplicate CSS and images folders (removed from root, kept only in public/)
- Fixed curly quotes in original travel.html template (bad code from class files)

REMOVED:

- Removed duplicate HTML files from root directory (about.html, contact.html, index.html, meals.html, news.html, rooms.html, travel.html)
- Removed duplicate css/ folder from root directory
- Removed duplicate images/ folder from root directory
- Removed duplicate layout.hbs from app_server/views/ (kept only in layouts/ folder)
- Removed anchor tags from images and headings in travel.hbs (fixes 404 errors from bad code)

---

MODULE 1 - 2025-02-08
---------------------

ADDED:

- Initial Express application setup with Handlebars view engine
- Static HTML files moved to public/ folder
- CSS files organized in public/css/ folder
- Images organized in public/images/ folder
- Basic Express server configuration
- Git repository initialized with module1 branch

CHANGED:

- Renamed public/stylesheets/ to public/css/ to match HTML file references

FIXED:

- Fixed broken links in index.html (dives.html -> travel.html, foods.html -> meals.html)
- Fixed typo in rooms.html footer ("Travele" -> "Travel")
- Fixed branding inconsistency in travel.html (title and copyright)

NOTES:

- Module 2 implements MVC architecture with Handlebars templating
- All routes now go through controllers following MVC pattern
- Handlebars partials reduce code duplication for header and footer
- Static files remain in public/ for direct access (CSS, images, etc.)
