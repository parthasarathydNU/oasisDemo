# Project Name

Short description of your project.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Firebase Configuration](#firebase-configuration)

## Description

This project has been designed as an aid for the Nodejs and Firebase workshop

## Prerequisites

Before you can run this project, ensure that you have the following prerequisites set up:

- Node.js: Make sure you have Node.js installed on your machine. You can download it from the official Node.js website: [https://nodejs.org](https://nodejs.org)
- npm: npm is the package manager for Node.js. It is usually included with the Node.js installation. You can verify its presence by running the following command in your terminal:

```bash
npm --version
```
- nvm (Node Version Manager): nvm allows you to manage multiple versions of Node.js on your machine. If you don't have nvm installed, you can follow the installation instructions for your operating system from the nvm GitHub repository: https://github.com/nvm-sh/nvm

## Installation

1. Clone the repository:

```bash
git clone https://github.com/parthasarathydNU/oasisDemo.git
```

2. Install dependencies:

```bash
cd oasisDemo
npm install
```

3. Set up Firebase:
    - Create a new Firebase project at the Firebase Console.
    - Generate the necessary configuration values (API key, project ID, etc.).
    - Add the configuration values to your project's Firebase configuration file (firebaseConfig).

4. Start the application

```bash
npm start
```


## Firebase Configuration

To obtain the Firebase configuration for your project, follow these steps:

1. Go to the Firebase Console and sign in with your Google account.

2. Click on the "Add project" button or select an existing project from the project list.

3. Once inside the project, click on the gear icon (⚙️) next to "Project Overview" in the left-hand sidebar and select "Project settings" from the dropdown menu.

4. In the "General" tab, scroll down to the section labeled "Your apps" and click on the "Web" option (represented by the </> icon).

5. Register your app by providing an app nickname (optional) and click on the "Register app" button.

6. After registering the app, you should see a code snippet that includes the Firebase configuration. It will look similar to the following:

```bash
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

7. Copy the entire firebaseConfig object.

That's it! You now have the Firebase configuration values required for your Node.js application.

Make sure to replace "YOUR_API_KEY", "YOUR_AUTH_DOMAIN", "YOUR_PROJECT_ID", "YOUR_STORAGE_BUCKET", "YOUR_MESSAGING_SENDER_ID", and "YOUR_APP_ID" with the actual values from your Firebase project configuration.

You can then use this configuration object in your Node.js application to initialize Firebase and access the Firebase services.

## Usage

This project illustrates how an backend application is structured in general.

Separation of concerns is a software design principle that aims to divide a system into distinct modules or components, each responsible for a specific aspect of functionality. The goal is to improve maintainability, reusability, and scalability by reducing dependencies and organizing code logically.

In the context of a backend application, separation of concerns typically involves dividing the application into three main components: routes, controllers, and services. Here's an overview of each component and their role in the application:

### Routes: ("./routes.js")

```
Routes define the API endpoints or URLs that clients can access to interact with the backend application.
They handle incoming HTTP requests and direct them to the appropriate controller method based on the requested endpoint and HTTP method (GET, POST, PUT, DELETE, etc.).
Routes are responsible for parsing request parameters, validating input, and invoking the corresponding controller method.
They are often defined using a routing framework or library, such as Express.js in Node.js.
```

### Controllers: ("controllers.js")

```
Controllers are responsible for handling the business logic related to a specific route or API endpoint.
They receive requests from the routes and process the data, typically by interacting with the application's services or models.
Controllers are responsible for extracting data from the request, validating it, and orchestrating the interactions between different services.
They prepare the response to send back to the client, usually by formatting the data and choosing the appropriate HTTP status code.
```

### Services: ("./firebase.js")

```
Services encapsulate the core business logic of the application.
They handle the processing of data, interaction with databases or external APIs, and any other complex operations required by the application.
Services are typically designed to be reusable and modular, allowing them to be easily shared across different controllers or even other projects.
They abstract away the details of data access and provide a higher-level interface for the controllers to interact with the underlying data sources.
The separation of concerns between routes, controllers, and services helps to maintain a clear and organized codebase.
```