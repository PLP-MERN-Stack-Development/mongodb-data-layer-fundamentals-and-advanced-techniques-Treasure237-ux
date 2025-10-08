# MongoDB Data Layer Fundamentals and Advanced Techniques

## Overview
This project demonstrates basic and advanced MongoDB operations using Node.js. It includes scripts for querying, updating, deleting, and paginating book records in a MongoDB database.

## Prerequisites
- Node.js installed
- MongoDB server running locally (`mongodb://localhost:27017`)
- The database `plp_bookstore` and collection `books` should exist with sample data

## Setup Instructions
1. **Clone or download the repository.**
2. **Install dependencies:**
   - Navigate to the `examples` folder (if using the example scripts) and run:
     ```powershell
     cd examples
     npm install
     ```
   - If your main scripts do not require extra packages, you can skip this step.
3. **Ensure MongoDB is running locally.**
   - Start your MongoDB server if it is not already running.

## How to Run the Scripts

### 1. Run `insert_books.js`
This script inserts sample book data into the database.
```powershell
node insert_books.js
```

### 2. Run `queries.js`
This script performs various queries and operations on the `books` collection.
```powershell
node queries.js
```

### 3. Run Example Scripts
If you want to test the example scripts in the `examples` folder:
```powershell
cd examples
node mongodb_connection_example.js
node mongodb_shell_example.js
```

## Notes
- All scripts assume MongoDB is running on `localhost:27017`.
- You can modify the scripts to match your database configuration if needed.
- Output will be displayed in the terminal.

## Troubleshooting
- If you get connection errors, ensure MongoDB is running and accessible at the specified URI.
- If you need to install dependencies, use `npm install` in the relevant folder.

## License
This project is for educational purposes.
