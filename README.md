# AI-Powered Code Review Assistant

An intelligent code review assistant that uses Google Gemini AI to provide real-time feedback, suggestions, and code improvements. This full-stack application features a modern React frontend and a robust Spring Boot backend.

##  Features

- **Real-time Code Analysis**: Instant feedback on your code using Gemini AI.
- **Syntax Highlighting**: Rich code editor experience supporting multiple languages.
- **Review History**: Track past reviews and suggestions.
- **Clean UI**: Modern, responsive interface built with React and Tailwind CSS.
- **Secure**: Backend validation and error handling.

##  Tech Stack

### Frontend
- **React**: UI Library
- **Vite**: Build tool
- **Monaco Editor**: Code editor component
- **Axios**: HTTP client
- **Tailwind CSS**: Styling (via index.css/App.css)

### Backend
- **Java 17**: Programming language
- **Spring Boot 3.2.3**: Backend framework
- **Spring Data JPA**: Database interaction
- **PostgreSQL**: Database
- **Google Gemini API**: AI Service

##  Prerequisites

- Node.js (v18+)
- Java JDK 17
- Maven
- PostgreSQL

##  Run Instructions

### 1. Database Setup
Create a PostgreSQL database named `codereviewdb` (or update `application.properties` in backend).

```sql
CREATE DATABASE codereviewdb;
```

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd codereviewapi
```

Configure your environment variables or `application.properties` with your Database credentials and Gemini API Key.

Run the application:
```bash
./mvnw spring-boot:run
```
The backend will start on `http://localhost:8080`.

### 3. Frontend Setup
Navigate to the frontend directory:
```bash
cd code-review-frontend
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```
The frontend will start on `http://localhost:5173`.

##  API Endpoints

- `POST /api/review`: Submit code for review.
- `GET /api/history`: Get review history.

## Architecture

The application follows a standard client-server architecture. The React frontend sends code snippets to the Spring Boot backend. The backend forwards the code to the Google Gemini API for analysis and stores the results in PostgreSQL.
