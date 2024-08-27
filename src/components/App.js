import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch questions from API
  useEffect(() => {
    if (page === "List") {
      fetch("http://localhost:4000/questions")
        .then((response) => response.json())
        .then((data) => setQuestions(data))
        .catch((error) => console.error("Error fetching questions:", error));
    }
  }, [page]);

  // Add a new question
  function addQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((addedQuestion) => {
        setQuestions((prevQuestions) => [...prevQuestions, addedQuestion]);
        setPage("List");
      })
      .catch((error) => console.error("Error adding question:", error));
  }

  // Delete a question
  function deleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting question:", error));
  }

  // Update a question
  function updateQuestion(id, updatedFields) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === id ? updatedQuestion : question
          )
        );
      })
      .catch((error) => console.error("Error updating question:", error));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={deleteQuestion}
          onUpdateQuestion={updateQuestion}
        />
      )}
    </main>
  );
}

export default App;
