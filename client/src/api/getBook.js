import { useState, useEffect } from 'react'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY
const PAGE_SIZE = 20

export default function useBooks(userQuery, page = 0) { 
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (!userQuery) return
    const controller = new AbortController()
    const params = new URLSearchParams({
      q:userQuery,
      startIndex: page * PAGE_SIZE,
      maxResults: PAGE_SIZE,
      key: API_KEY
    })
    const url = `https://www.googleapis.com/books/v1/volumes?${params}` 
    fetch(url, {signal: controller.signal} )
      .then((res) => res.json())
      .then((data) => setBooks(data.items || []))
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err) 
      })
    return () => controller.abort()
  }, [userQuery, page])

  return books
}