# Aesthetic Reads

Aesthetic reads is a React website that allows users to create mood boards using book covers. 

## Moodboard Visuals 
<img width="1889" height="832" alt="gallery overview" src="https://github.com/user-attachments/assets/776c96b3-f0db-43f2-891a-04d4db0ee529" />

<img width="1920" height="877" alt="an overview of the favourite mood board" src="https://github.com/user-attachments/assets/98491e56-453e-4d6d-a803-ce25bf86e222" />

## Tech Stack
* **Frontend**: React, Tailwind CSS, Axios
* **Backend**: Node.js, Express, Sequelize
* **Database**: PostgreSQL (hosted on Aiven)
* **APIs**: Google Books API

## Key Features 
* Search for books using author/title via Google Books API
* Create and delete mood board
* Save books to mood board on home page
* Create user account
* Choose profile picture and create a user biography

## Live Demo
For testing use demo account:
username: demo
password: demo1@3

Link to website: https://aesthetic-reads.onrender.com/ 

## Local Usage
1. Clone the repo and install dependencies:
```bash
   git clone git@github.com:Gitrua07/aesthetic-reads.git
   cd aesthetic-reads/server && npm install
   cd ../client && npm install
```
2. Create `server/.env`:
```
   DATABASE_URL=your_postgres_connection_string
   GOOGLE_BOOKS_API_KEY=your_key
```
Any PostgreSQL database works; I used Aiven for hosting.
3. Start the server and client (in separate terminals):
```bash
   npm run dev
```

## What I've learned
* I implemented an authentication context which makes access to user information accessible in all components
* When accessing back-end methods using Axios, applied async/await to handle Promises
* Implemented POST method to create user account to user table and mood boards to mood board table

## Credits

* book-placeholder.jpg: Photo by <a href="https://unsplash.com/@fluffyflick?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Rasmus Smedstrup Mortensen</a> on <a href="https://unsplash.com/photos/blue-sky-with-white-clouds-_ZtPsxAomeI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

### Profile pictures
<a href="https://www.flaticon.com/free-icons/woman" title="woman icons">Woman icons created by Magnific - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/girl" title="girl icons">Girl icons created by Magnific - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/man" title="man icons">Man icons created by Magnific - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/doctor" title="doctor icons">Doctor icons created by Magnific - Flaticon</a>
      
