import { useState, useEffect } from 'react'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY


export default function useBooks(userQuery) { 
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (!userQuery) return
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(userQuery)}&key=${API_KEY}&maxResults=40`)
      .then((res) => res.json())
      .then((data) => setBooks(data.items || []))
  }, [userQuery])

  return books
}