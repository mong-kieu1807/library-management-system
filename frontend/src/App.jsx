import { useEffect, useState } from 'react'
import './App.css'

const DEFAULT_API_BASE_URL = '/api'
const BOOKS_ENDPOINT = 'books'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/${BOOKS_ENDPOINT}`)

        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu từ backend')
        }

        const data = await response.json()
        setBooks(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [apiBaseUrl])

  const columns = books.length > 0 ? Object.keys(books[0]) : []

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">MySQL connected</p>
          <h1>Library management dashboard</h1>
          <p className="subtitle">
            Dữ liệu đang được lấy trực tiếp từ bảng <strong>books</strong> trong MySQL.
          </p>
        </div>

        <div className="stats-card">
          <span>Tổng số sách</span>
          <strong>{books.length}</strong>
        </div>
      </section>

      <section className="table-card">
        <div className="table-header">
          <h2>Books table</h2>
          <p>GET /api/books</p>
        </div>

        {loading && <div className="state">Đang tải dữ liệu...</div>}
        {error && <div className="state error">{error}</div>}

        {!loading && !error && books.length === 0 && (
          <div className="state">Bảng books đang trống.</div>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book.book_id ?? `${index}-${book.title ?? 'book'}`}>
                    {columns.map((column) => (
                      <td key={column}>{String(book[column] ?? '')}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
