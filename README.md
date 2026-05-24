# Holidaze
<p align="center"> <img src="./src/assets/logo-white.svg" alt="Holidaze logo" width="220"/> </p> <p align="center"> A modern Scandinavian-inspired accommodation booking platform built with React, TypeScript, Vite, and Tailwind CSS. </p> <p align="center"> <a href="https://holidaze-pe2-ina.netlify.app/"><strong>Live Demo</strong></a> · <a href="https://github.com/inastefansdottir/FED2-PE2-inastefansdottir"><strong>GitHub Repository</strong></a> </p>

## Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Advanced Search System](#advanced-search-system)
4. [Pages & Modals](#pages--modals)
5. [UI/UX & Design](#uiux--design)
6. [Style Guide](#style-guide)
7. [Tech Stack](#tech-stack)
8. [User Stories](#user-stories)
9. [API Endpoints](#api-endpoints)
10. [Folder Structure](#folder-structure)
11. [Installation](#installation)
12. [Environment Variables](#environment-variables)
13. [Testing & Validation](#testing--validation)
14. [Credits](#credits)

## Project Overview
Holidaze is a modern venue booking application developed for the Noroff FED2 Final Exam Project.

The platform allows customers to browse and book venues, while venue managers can create and manage their own listings and bookings.

The project focuses heavily on:

- Clean UI/UX design
- Responsive layouts
- Accessibility
- Real-world booking interactions
- Dynamic search functionality
- Role-based user experiences

Inspired by Scandinavian minimalism and modern booking platforms like Airbnb, Holidaze was designed to feel polished, intuitive, and production-ready.

## Key Features

### Visitor Features
- Browse all venues
- Search venues by:
  - Location
  - Date availability
  - Number of guests
- View venue details
- View booking calendar
- Register as customer or venue manager
- Login/logout functionality

### Customer Features
- Book venues
- View upcoming bookings
- Update avatar/profile
- Manage account information

### Venue Manager Features
- Create venues
- Edit venues
- Delete venues
- View venue bookings
- Manage hosted venues
- Switch seamlessly between bookings and venue management

## Advanced Search System

One of the main custom features of Holidaze is the advanced frontend search system.

Instead of only searching by venue name, users can dynamically filter venues based on:

- Destination/location
- Guest capacity
- Date availability

The filtering logic was built entirely on the frontend using TypeScript and React state management

## Pages & Modals

### Pages
- Home Page
- Venue Page
- Register Page
- Profile Page
- Venue Manager Dashboard

### Modals
- Login Modal
- Create Venue Modal
- Edit Venue Modal
- Edit Profile Modal

## UI/UX & Design

The design direction focuses on:

- Scandinavian minimalism
- Soft earthy color palettes
- Spacious layouts
- Clean typography
- Intuitive navigation
- Mobile-first responsiveness

Some UI inspiration was taken from modern booking platforms such as Airbnb, particularly in the search experience.

## Style Guide
### Color Palette

| Color      | Hex       |
| ---------- | --------- |
| Deep Teal  | `#285260` |
| Muted Teal | `#558C91` |
| Light Aqua | `#B4D8D8` |
| Warm Beige | `#AB9072` |
| Soft Sand  | `#E0D7CE` |
| Off White  | `#F7F9F9` |
| Dark Slate | `#1F2937` |

### Typography
- **Heading font:** Gloock
- **Body font:** Lexend

### Icons
- Font Awesome

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
  
### API
- Noroff Holidaze API

### Deployment
- Netlify

### Tools & Design
- Figma
- GitHub Projects

## User Stories

| Feature            | User Type     | Description                           |
| ------------------ | ------------- | ------------------------------------- |
| Browse venues      | Visitor       | View all available venues             |
| Search venues      | Visitor       | Search by location, guests, and dates |
| View venue details | Visitor       | Open a specific venue page            |
| Register account   | Visitor       | Register as customer or venue manager |
| Create booking     | Customer      | Book a venue                          |
| View bookings      | Customer      | Manage upcoming bookings              |
| Update avatar      | Customer      | Personalize profile                   |
| Create venue       | Venue Manager | Publish a new venue                   |
| Edit venue         | Venue Manager | Update venue information              |
| Delete venue       | Venue Manager | Remove a venue                        |
| Manage bookings    | Venue Manager | View bookings for owned venues        |


## API Endpoints

| Endpoint                   | Method | Purpose            |
| -------------------------- | ------ | ------------------ |
| `/auth/register`           | POST   | Register user      |
| `/auth/login`              | POST   | Login user         |
| `/holidaze/venues`         | GET    | Fetch all venues   |
| `/holidaze/venues/:id`     | GET    | Fetch single venue |
| `/holidaze/venues`         | POST   | Create venue       |
| `/holidaze/venues/:id`     | PUT    | Update venue       |
| `/holidaze/venues/:id`     | DELETE | Delete venue       |
| `/holidaze/bookings`       | POST   | Create booking     |
| `/holidaze/profiles/:name` | GET    | Fetch profile      |

## Folder Structure

```bash
src/
├── components/
├── pages/
├── hooks/
├── api/
├── layouts/
├── types/
├── utils/
├── assets/
└── styles/
```

## Installation  
To get a local copy of this project up and running:  

1. Clone the repo:  
   ```bash
   git clone https://github.com/inastefansdottir/FED2-PE2-inastefansdottir.git
   cd FED2-PE2-inastefansdottir

2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm run dev

4. Open the app in your browser:
   ```bash
   http://localhost:5173

Note: You need **Node.js** installed on your machine to run the project.

### Environment Variables
Create a .env file in the root directory:
```bash
VITE_API_KEY=your_noroff_api_key
VITE_API_BASE_URL=your_api_url
```

## Testing & Validation

The project was manually tested across multiple screen sizes and user flows.

Validation tools used:

- Lighthouse
- WAVE Accessibility Tool
- HTML Validator

Key testing areas:

- Authentication flows
- Venue creation/editing
- Booking logic
- Search functionality
- Responsive layouts
- Protected routes

## Credits

Developed by Ina Stefansdottir
Final Exam Project — Noroff Frontend Development
