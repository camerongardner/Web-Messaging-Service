# Web Messaging Service

## Overview

The Web Messaging Service is a Node.js and Express-based web application that provides authenticated messaging functionality. Users can register, log in, and securely send and receive messages.

## Features
- **User Authentication**: Secure registration and login using JWT tokens for session management.
- **Messaging**: Allows users to send and receive messages within the application.
- **Security**: Passwords are hashed using bcryptjs, and sessions are managed with JWTs stored in cookies.

## Prerequisites
- Node.js and npm
- MongoDB (local or hosted)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd web-messaging-service
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment Variables: Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=3000
   ```

## Scripts
- **Start the Server**:
  ```bash
  npm start
  ```
- **Development Mode (with auto-reloading)**:
  ```bash
  npm run dev
  ```

## Usage
- **Home Page**: `/` - Welcome page with options to register or log in.
- **Register**: `/register` - Allows new users to create an account.
- **Login**: `/login` - User login to access their inbox and messaging features.
- **Inbox**: `/messages/inbox` - Shows all received messages.
- **Send Message**: `/messages/send` - Allows authenticated users to send a message.

## File Structure
- **Views** (`.ejs` files): Rendered with EJS templating.
- **Controllers** (`apiMessages.js`, `frontendMessages.js`): Handle business logic for messages and authentication.
- **Models** (`User.js`, `Message.js`): Define MongoDB schemas using Mongoose.
- **Middleware** (`auth.js`, `isAuth.js`): Provide route protection using JWTs.

## Resources
### Video Demonstration
A video walkthrough of the project is available on YouTube. Watch the video for a step-by-step demonstration of the Web Messaging Service’s functionality and setup process.

**YouTube Link**: [Your Video Link Here]

### Additional Project Files
If there are additional files or assets used in this project, download them from the following links or directories as needed:

**Project Resources**: Download any required resources, such as datasets, additional libraries, or other assets, from [Resource Link Here] or the resources folder in the project repository.

## Dependencies
- **Express**: Web server and routing.
- **Mongoose**: MongoDB integration.
- **EJS**: Template engine for rendering HTML pages.
- **bcryptjs**: Secure password hashing.
- **jsonwebtoken**: JWT authentication.

## License
This project is licensed under the **ISC License**.
