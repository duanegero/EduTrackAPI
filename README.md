# EduTrack API

This is an API back end to handle requests made from EduTrack frontend app, Postman, or CURL

- [Installation](#installation)
- [Frontend Repository](#frontend)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [License](#license)

## Installation

1. Clone Repository:<br>
   `git clone https://github.com/duanegero/EduTrackAPI.git`
2. Navigate to the Project Directory
3. Install Dependencies:<br>
   `npm install`
4. Start Server<br>
   `node index.js`

## Frontend

### React App

https://github.com/duanegero/EduTrackReactApp.git

## API Endpoints

### Student Endpoints

- GET `/students` - Get all students
- GET `/students/:grade` - Get all students in grade level
- POST `/students` - Create new student
- PUT `/students/:id` - Update student by ID
- DELETE `/students/:id` - Delete student by ID

### Grade Endpoints

- GET `/grades/:id` - Get student grades by ID
- PUT `/grades/:id` - Update student grades by ID

## Usage

Once the server is running you can interact with the API through the available endpoints. Here is an example of how to add a new student with `/students` POST endpoint using Postman or any HTTP client:

### Example Request (POST `/students`)

```
{
    "lastname": "Doe",
    "firstname": "John",
    "dob": "1111-11-11",
    "grade": "1"
}
```

The API and Database will add student ID

## License

This project is licensed under the MIT License.
