import type { Book } from "../types/book";
import { formatNumber } from "../utils/formatters";

type BookTableProps = {
  books: Book[];
};

export function BookTable({ books }: BookTableProps) {
  return (
    <div className="table-card">
      <div className="table-wrapper">
        <table className="book-table">
          <thead>
            <tr>
              <th>ردیف</th>
              <th>نام کتاب</th>
              <th className="book-price">قیمت (تومان)</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr key={book.id}>
                <td>{formatNumber(index + 1)}</td>
                <td>{book.name}</td>
                <td className="book-price">{formatNumber(book.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile-book-list">
        {books.map((book, index) => (
          <article key={book.id} className="mobile-book-card">
            <div>
              <span className="mobile-book-card__index">#{index + 1}</span>
              <h3>{book.name}</h3>
            </div>

            <strong>{formatNumber(book.price)}</strong>
          </article>
        ))}
      </div>
    </div>
  );
}
