🎬 Genres API – RESTful API with Express.js
A simple RESTful API built with Express.js for managing a list of movie genres. This project supports full CRUD operations (Create, Read, Update, Delete) on an in-memory array of genres.

🔧 Technologies Used
Node.js
Express.js
Joi (for input validation)

📁 Project Structure
/project-root
│
├── index.js            // Main server setup
└── routes/
    └── genres.js       // Route handlers for genres

📌 API Endpoints
  🔹 GET /api/genres
    Returns the list of all genres.
  
  🔹 GET /api/genres/:id
    Returns a single genre by its id.
  
  🔹 POST /api/genres
    Adds a new genre.

      Request body (JSON):
      {
        "name": "Horror"
      }
      
  🔹 PUT /api/genres/:id
    Updates the name of an existing genre.
    Request body (JSON):
    
      {
        "name": "Sci-Fi"
      }
  🔹 DELETE /api/genres/:id
    Deletes the genre with the given id.

✅ Input Validation
  All input data is validated using Joi. The name field must be a string with at least 3 characters.

🚀 How to Run the App
  Install dependencies:

    npm install
  Start the server:
  
    node index.js

By default, the app runs on port 3000. To use a custom port, set the environment variable:

    $env:PORT=5000
