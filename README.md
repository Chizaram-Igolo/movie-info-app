# Movie Search App 🍿🎬

Welcome to the Movie Search App! Search for your favorite movies and explore their details with ease.

<p align="center">
  <img src="./images/demo.gif" alt="Your GIF" />
</p>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Movie Search App allows users to search for movies, view details of selected movies, and explore search history. It is built with React for the frontend and ASP.NET Core for the backend.

## Features

- **Search Movies:** Easily search for movies using the provided search bar.
- **Shows Search Results:** Presents a list of matches for the search string.
- **View Details:** Click on a movie to view detailed information, including the poster, release year, plot, and IMDB score.
- **Search History:** Keep track of your recent movie searches.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.0.0 or later)
- [npm](https://www.npmjs.com/) (for managing JavaScript dependencies)
- [.NET SDK](https://dotnet.microsoft.com/download) (v8.0 or later)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/movie-search-app.git
   cd movie-search-app
   ```

2. **Install frontend dependencies:**

   ```bash
   cd movie-search-app/movieinfoapp.client
   npm install
   ```

3. **Install backend dependencies:**

   ```bash
   cd ../MovieInfoApp.Server
   dotnet restore
   ```

### Usage

1. **Build and Run the Application:**

   ```bash
   dotnet build && dotnet run
   ```

2. **Run Tests:**

   ```bash
   dotnet test
   ```

3. **Open Application:**

   Navigate to `https://localhost:5173/` on your browser to view the application.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests to help improve the project.

## License

This project is licensed under the MIT License.
