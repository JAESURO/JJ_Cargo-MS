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
  - Backend availability checking with user warnings
  - Improved loading states and error messages
- **JavaScript Improvements:**
  - Centralized configuration management (`config.js`)
  - Robust initialization handling for DOM and config loading
  - Better error handling and user feedback
  - Backend connectivity checks with user notifications

---

## Deployment & Security
- **API keys and sensitive data are never committed.**
- Google Maps API key is injected at deploy time using environment variables.
- Backend includes Dockerfile for containerized deployment
- Frontend can be deployed as a static site on Render platform.

---

## Getting Started
1. **Backend:**
   - Configure your database and Google Maps API key in environment variables.
   - Run with Maven: `mvn spring-boot:run`
2. **Frontend:**
   - Serve with a static server (e.g., Python, Node, or Render static site).
   - Ensure the API key is injected at build/deploy time.
   - Backend availability will be automatically checked on page load.
3. **Login/Register:**
   - Register a user, log in, and manage your cargo, locations, categories, and shipments.
4. **Token Management:**
   - Tokens automatically expire after 30 days
   - Users are automatically redirected to login when tokens expire
   - Use the logout button to manually clear tokens
   - Backend connectivity issues are automatically detected and reported

---

## Recent Updates
- **Frontend JavaScript Improvements:**
  - Streamlined initialization process for all pages
  - Better error handling and user feedback
  - Centralized configuration management
  - Backend availability checking with user notifications
  - Improved loading states and error messages
- **User Experience Enhancements:**
  - Automatic backend connectivity checks
  - Better error messages for network issues
  - Improved form validation and feedback
  - Enhanced empty state handling

---

For more details, see the code and comments in each module. For Google Maps API setup, see [Google Maps JavaScript API documentation](https://developers.google.com/maps/documentation/javascript/get-api-key).