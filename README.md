# Cargo Automation Project

## Overview
Cargo Automation is a full-stack web application for managing cargo, categories, locations, shipments, and users. It is designed for logistics and supply chain management, providing secure user authentication, shipment tracking, and integration with Google Maps for location management.

---

## Backend (Spring Boot, Java)
- **Framework:** Spring Boot (Java)
- **Database:** PostgreSQL (configurable)
- **Security:** JWT-based authentication, user-specific data access
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
- **Features:**
  - JWT authentication (login/register)
  - CRUD for all main entities
  - Google Maps integration for picking location coordinates
  - Distance Matrix API for auto-filling shipment distances
  - User-specific data views
  - Responsive, Bootstrap-styled UI
  - Error and empty-state handling (e.g., "No locations found for your account.")

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

---

For more details, see the code and comments in each module. For Google Maps API setup, see [Google Maps JavaScript API documentation](https://developers.google.com/maps/documentation/javascript/get-api-key).
