import * as XLSX from "xlsx";
import type { Book } from "../types/book";

const BOOK_NAME_HEADERS = ["book name", "name", "title", "book"];

const PRICE_HEADERS = ["price", "cost", "amount", "book price"];

function normalizeHeader(value: unknown): string {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function findColumnIndex(headers: unknown[], possibleNames: string[]): number {
  return headers.findIndex((header) =>
    possibleNames.includes(normalizeHeader(header)),
  );
}

function parsePrice(value: unknown): number {
  if (typeof value === "number") return value;

  const cleaned = String(value ?? "")
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");

  const parsed = Number(cleaned);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function parseRows(rows: unknown[][]): Book[] {
  if (!rows.length) {
    throw new Error("The Excel file is empty.");
  }

  const headers = rows[0];
  const bookNameIndex = findColumnIndex(headers, BOOK_NAME_HEADERS);
  const priceIndex = findColumnIndex(headers, PRICE_HEADERS);

  if (bookNameIndex === -1 || priceIndex === -1) {
    throw new Error(
      "Could not find required columns. Expected columns like 'Book Name' and 'Price'.",
    );
  }

  const books: Book[] = rows
    .slice(1)
    .map((row, index) => {
      const name = String(row[bookNameIndex] ?? "").trim();
      const price = parsePrice(row[priceIndex]);

      if (!name) return null;

      return {
        id: `${name}-${index}`,
        name,
        price,
      };
    })
    .filter((book): book is Book => book !== null);

  return books;
}

export async function parseExcelFromUrl(url: string): Promise<Book[]> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load the Excel file.");
  }

  const arrayBuffer = await response.arrayBuffer();

  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    throw new Error("No sheet found in the Excel file.");
  }

  const worksheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
  }) as unknown[][];

  return parseRows(rows);
}
