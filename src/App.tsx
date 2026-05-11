import { useEffect, useMemo, useState } from "react";
import "./App.css";

import { SearchBar } from "./components/SearchBar";
import { BookTable } from "./components/BookTable";
import { EmptyState } from "./components/EmptyState";
import { parseExcelFromUrl } from "./utils/excelParser";
import type { Book } from "./types/book";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const parsedBooks = await parseExcelFromUrl(
          `${import.meta.env.BASE_URL}books.xlsx`,
        );
        setBooks(parsedBooks);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "خطایی در بارگذاری فایل اکسل رخ داد.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return books;

    return books.filter((book) => book.name.toLowerCase().includes(query));
  }, [books, search]);

  return (
    <div className="app-shell">
      <div className="background-glow background-glow-1"></div>
      <div className="background-glow background-glow-2"></div>

      <main className="container">
        <header className="hero">
          <div>
            <h1>پاتوق کتاب دانشگاه شیراز</h1>
          </div>
        </header>

        {loading && (
          <section className="panel status-panel">
            <div className="loader"></div>
            <p>در حال بارگذاری کتاب‌ها از فایل اکسل...</p>
          </section>
        )}

        {error && !loading && (
          <section className="panel error-panel">
            <h3>امکان بارگذاری داده‌ها وجود ندارد</h3>
            <p>{error}</p>
          </section>
        )}

        {!loading && !error && (
          <>
            <section className="panel controls-panel">
              <div className="section-heading">
                <h2>جستجوی کتاب‌ها</h2>
              </div>

              <SearchBar value={search} onChange={setSearch} />
            </section>

            <section className="panel table-panel">
              <div className="section-heading">
                <h2>رکوردهای کتاب</h2>
              </div>

              {filteredBooks.length > 0 ? (
                <BookTable books={filteredBooks} />
              ) : (
                <EmptyState
                  title="کتابی یافت نشد"
                  description="عبارت جستجوی دیگری را امتحان کنید."
                />
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
