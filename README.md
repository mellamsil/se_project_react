# WTWR (What to Wear?) - Full-Stack Application

## Overview

The WTWR application is a full-stack web application that allows users to create an account, log in, and interact with a collection of clothing items. The application features user authentication, profile editing, and the ability to add likes to clothing items.

## Technologies and Techniques Used

These technologies and techniques were used to build a full-stack web application that provides a robust and scalable solution for managing clothing items and user interactions.

### Tech Stack

- Frontend: React, Vite, JSX, CSS
- Backend: Node.js, Express, MongoDB
- Authentication: JSON Web Tokens (JWT)
- API Integration: OpenWeatherMap
- State Management: React Hooks, Context API
- Styling: Modular CSS files, normalize.css, fonts.css
- Development Tools: Prettier, ESLint, .prettierignore

## Features

- User registration and login functionality
- Profile editing and updating
- Ability to add likes to clothing items
- Protected routes for authorized users
- Responsive design and user-friendly interface

## API Endpoints

### User Routes:

- `POST /signup`: Create a new user account
- `POST /signin`: Log in to an existing user account
- `GET /users/me`: Get the current user's profile information
- `PATCH /users/me`: Update the current user's profile information

### Clothing Item Routes

- `GET /items`: Get a list of all clothing items
- `POST /items`: Create a new clothing item
- `DELETE /items/:id`: Delete a clothing item
- `PUT /items/:id/likes`: Add a like to a clothing item
- `DELETE /items/:id/likes`: Remove a like from a clothing item

## Installation and Running

1. Clone the repository and install dependencies
2. Start the back-end server by running `npm start` in the server directory
3. Start the front-end development server by running `npm start` in the client directory
4. Open web browser and navigate to `http://localhost:3000` to access the application

## Deployment

This webpage is deployed to GitHub pages

- Deployment Link: https://github.com/mellamsil/se_project_react

- Backend Deployment Link: https://github.com/mellamsil/se_project_express.git
