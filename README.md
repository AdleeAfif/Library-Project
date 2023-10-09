**README.md**

# Library API using Node.js and Express

## Project Overview:

- Browse through a collection of books
- Borrow and return books

## Features:

### 1. Authentication:
Implement PassportJS based authentication system to authenticate users securely.

### 2. Authorization:
Users will be assigned specific roles, and middleware will be used to restrict access to certain endpoints based on the user's role. This ensures that only authorized users can perform specific actions.

### 3. Secret Management:
Sensitive information such as passwords and JWT secrets will be securely stored in environment variables. This practice prevents unauthorized access to sensitive data.

### 4. Database Management:
MySQL will be used as the database management system to store information about books and users. Proper database schema and relationships will be implemented to maintain data integrity.

## How to Use:

1. **Clone the Repository:**
   ```
   git clone https://github.com/AdleeAfif/Library-Project.git
   cd library-api
   ```

2. **Install Dependencies:**
   ```
   npm install
   ```

3. **Set Environment Variables:**
   Create a `.env` file and set the necessary environment variables, including database connection details and JWT secrets.

4. **Run the Application:**
   ```
   npm run dev
   ```

5. **Access the API:**
   Open your API testing tool and access the API endpoints.
