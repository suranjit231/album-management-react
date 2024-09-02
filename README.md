# Album Management Application

This React application allows users to manage albums by fetching, adding, updating, and deleting albums through API calls. The app uses Redux for state management, React Router for routing, and `jsonplaceholder.typicode.com` as a mock API for demonstrating the functionalities.

## Features

- **Fetch Albums**: Retrieve and display a list of albums from the API.
- **Add Album**: Add a new album via a POST request to the API, saving the album in the React state.
- **Update Album**: Update an existing album via a PUT request to the API.
- **Delete Album**: Delete an album via a DELETE request to the API.

## Setup and Configuration

### Prerequisites

- Node.js 
- npm 

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/suranjit231/album-management-react.git
   ```
2. Navigate to the project directory:
    ```
    cd albumlist
    ```
3. Install the dependencies:
```
npm install
```
### Running the Application

1. Start the development server:
``` npm start ```

2. Open your browser and go to http://localhost:3000 to view the application.

### Folder Structure:
```
albumlist/
│
├── public/                        # Public assets
│   └── index.html                 # HTML template
│
├── src/                           # Source files
│   ├── components/                # Reusable components
│   │   └── navbar/                # Navbar component
│   │       ├── Navbar.js          # Navbar logic and JSX
│   │       └── Navbar.module.css  # Navbar styling
│   │
│   ├── pages/                     # Page components
│   │   ├── albums/                # Album list page
│   │   │   ├── AlbumList.js       # Logic and JSX for listing albums
│   │   │   └── AlbumList.module.css  # Styling for AlbumList
│   │   ├── addAlbum/              # Add album form page
│   │   │   ├── AddAlbumForm.js    # Logic and JSX for adding/updating albums
│   │   │   └── AddAlbumForm.module.css  # Styling for AddAlbumForm
│   │
│   ├── redux/                     # Redux-related files
│   │   └── albumReducer.js        # Redux slice for album management
│   │
│   ├── App.js                     # Main application component
│   ├── index.js                   # Entry point for React
│   └── index.css                  # Global styling
│
└── package.json                   # Project configuration and dependencies
```
