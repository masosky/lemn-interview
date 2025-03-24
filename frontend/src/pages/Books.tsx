import React, { useEffect, useState } from "react";
import { GetBooksPayload } from "../types/types";
import { API_URL } from "../api/api";

export default function Books() {
  const [books, setBooks] = useState<GetBooksPayload>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/books`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading books...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div style={styles.container}>
      <h2>Books List</h2>
      <div style={styles.grid}>
        {books?.data?.map((book) => (
          <div key={book.id} style={styles.card}>
            <h3>{book.title}</h3>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Price:</strong> ${book.price}
            </p>
            <p>
              <strong>Stock:</strong> {book.stock} copies
            </p>
            <p>
              <strong>Published:</strong>{" "}
              {new Date(book.createdAt).toDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center" as const,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
    textAlign: "left" as const,
  },
};
