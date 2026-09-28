import { useState, useEffect } from 'react'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY


export default function useBooks(userQuery) { 
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (!userQuery) return
    const controller = new AbortController()
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(userQuery)}&key=${API_KEY}&maxResults=40` 
    fetch(url, {signal: controller.signal} )
      .then((res) => res.json())
      .then((data) => setBooks(data.items || []))
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err) 
      })
    return () => controller.abort()
  }, [userQuery])

  return books
}