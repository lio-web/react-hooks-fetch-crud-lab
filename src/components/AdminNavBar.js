import React from "react";

function AdminNavBar({ onChangePage }) {
  return (
    <nav>
      <button
        onClick={() => onChangePage("Form")}
        aria-label="Navigate to New Question Form"
      >
        New Question
      </button>
      <button
        onClick={() => onChangePage("List")}
        aria-label="View Questions List"
      >
        View Questions
      </button>
    </nav>
  );
}

export default AdminNavBar;
