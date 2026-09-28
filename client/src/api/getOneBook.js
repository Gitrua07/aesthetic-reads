import { useState, useEffect } from 'react'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

export default function useOneBook(bookId) {
  const [book, setBook] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${API_KEY}` 
    fetch(url, {signal: controller.signal})
      .then((res) => res.json())
      .then((data) => {setBook(data)})

    return () => controller.abort() 
    }, [bookId])

  return book
}
