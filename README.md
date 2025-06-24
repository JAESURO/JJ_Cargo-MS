# Cargo Automation Project

## Overview
Cargo Automation is a full-stack web application for managing cargo, categories, locations, shipments, and users. It is designed for logistics and supply chain management, providing secure user authentication, shipment tracking, and integration with Google Maps for location management.

---

## Backend (Spring Boot, Java)
- **Framework:** Spring Boot (Java)
- **Database:** PostgreSQL (configurable)
- **Security:** JWT-based authentication, user-specific data access
- **JWT Configuration:**
  - Token expiration: 30 days (configurable in `JwtUtil.java`)
  - Secure token validation and user authentication
  - Automatic token expiration handling
- **RESTful API Endpoints:**
  - **User Authentication:**
    - `POST /auth/register` — Register a new user
    - `POST /auth/login` — Login and receive a JWT token
  - **Category Management:**
    - `GET /category` — List categories for the authenticated user
    - `POST /category` — Create a new category (user-specific)
  - **Location Management:**
    - `GET /location` — List locations for the authenticated user
    - `POST /location` — Create a new location (with name, latitude, longitude)
  - **Cargo Management:**
    - `GET /cargo` — List all cargo for the authenticated user
    - `POST /cargo` — Create new cargo (with name, category, weight)
    - `PUT /cargo/{id}` — Update cargo
    - `DELETE /cargo/{id}` — Delete cargo
  - **Shipment Management:**
    - `GET /shipment` — List all shipments for the authenticated user (with full details via DTO)
    - `POST /shipment` — Create a new shipment (with name, cargo, locations, status, times, distance, success)
- **DTOs:** Used for secure and detailed data transfer (e.g., `ShipmentDTO` for frontend display)
- **User-specific Data:** All main entities are linked to users; users only see and manage their own data.
- **CORS:** Configured for secure frontend-backend communication.

---

## Frontend (HTML, JavaScript, Bootstrap)
- **Multi-page app**
- **Pages:**
  - Dashboard (index.html)
  - Cargo, Category, Location, Shipment management
  - Login & Register
- **Authentication & Token Management:**
  - JWT authentication (login/register)
  - Automatic token expiration detection
  - Automatic redirect to login when token expires
  - Centralized token handling via `auth.js`
  - Logout functionality with token cleanup
- **Features:**
  - CRUD for all main entities
  - Google Maps integration for picking location coordinates
  - Distance Matrix API for auto-filling shipment distances
  - User-specific data views
  - Responsive, Bootstrap-styled UI
  - Error and empty-state handling (e.g., "No locations found for your account.")
  - 401 error handling with automatic logout

---

## JWT Token Management
The application includes robust JWT token management to handle token expiration gracefully:

### Backend Improvements:
- **Extended Token Lifetime:** JWT tokens now expire after 30 days instead of 10 hours
- **Proper Error Handling:** Clear error messages for expired tokens

### Frontend Improvements:
- **Token Expiration Detection:** Automatic checking of token expiration on page load
- **Automatic Redirect:** Users are automatically redirected to login when tokens expire
- **Centralized Auth Logic:** All authentication logic is centralized in `auth.js`
- **401 Error Handling:** API calls automatically handle 401 responses and redirect to login
- **Logout Functionality:** Added logout button to all pages for manual token cleanup

### Files Modified:
- `Backend/src/main/java/com/yourcompany/cargoautomation/config/JwtUtil.java` - Extended token lifetime
- `Frontend/js/auth.js` - New centralized authentication utilities
- `Frontend/js/logout.js` - New logout functionality
- All frontend JavaScript files updated to use centralized auth functions
- All HTML files updated to include auth.js and logout.js

---

## Deployment & Security
- **API keys and sensitive data are never committed.**
- Google Maps API key is injected at deploy time using environment variables and a placeholder in `location.html`.
- See deployment instructions in project comments and Render setup.

---

## Getting Started
1. **Backend:**
   - Configure your database and Google Maps API key in environment variables.
   - Run with Maven: `mvn spring-boot:run`
2. **Frontend:**
   - Serve with a static server (e.g., Python, Node, or Render static site).
   - Ensure the API key is injected at build/deploy time.
3. **Login/Register:**
   - Register a user, log in, and manage your cargo, locations, categories, and shipments.
4. **Token Management:**
   - Tokens automatically expire after 30 days
   - Users are automatically redirected to login when tokens expire
   - Use the logout button to manually clear tokens

---

For more details, see the code and comments in each module. For Google Maps API setup, see [Google Maps JavaScript API documentation](https://developers.google.com/maps/documentation/javascript/get-api-key).
