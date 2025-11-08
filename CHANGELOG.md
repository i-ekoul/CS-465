CHANGELOG
=========

All notable changes to the Travlr Getaways project will be documented in this file.

Emmalie S. Cole | CS-465 @SNHU

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
