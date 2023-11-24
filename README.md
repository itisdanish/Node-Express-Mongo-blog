# Blog Application

This is a simple blog application built using Node.js, Express, and MongoDB.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This blog application allows users to create, view, and manage blog posts. It uses Node.js for the backend, Express as the web framework, and MongoDB as the database. Users can also upload images for their blog posts.

## Features

- Create, edit, and delete blog posts.
- Upload images for blog posts.
- View a list of all blog posts on the home page.
- View individual blog posts on their own pages.
- Simple contact and about pages.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/blog-application.git
2. Install dependencies:
   ```bash
   cd blog-application
   npm install
3. Set up MongoDB:
   - Make sure MongoDB is installed on your machine.
   - Update the MongoDB connection string in `app.js` with your own MongoDB URL.
4. Start the application:
   ```bash
   npm start
The application will be accessible at `http://localhost:8080`.

## Usage

- Visit http://localhost:8080 to see the list of blog posts.
- Click on "New Post" to create a new blog post.
- Click on a blog post title to view the full post.
- Explore other pages like "About" and "Contact."

## Folder Structure

- database: Contains the MongoDB models and connection setup.
- public: Static assets (CSS, images, etc.).
- views: Edge.js templates for rendering HTML.
- README.md: Project documentation.
- app.js: Main application file.
- `...

## Contributing

- Contributions are welcome! Feel free to open issues and pull requests.


## License

- This project is licensed under the MIT License - see the LICENSE file for details.