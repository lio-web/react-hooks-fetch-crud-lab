import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  function handleDelete() {
    onDeleteQuestion(question.id);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "correctIndex") {
      onUpdateQuestion(question.id, { correctIndex: parseInt(value) });
    }
  }

  return (
    <li>
      <div>
        <h3>{question.prompt}</h3>
        <ul>
          {question.answers.map((answer, index) => (
            <li key={index}>{answer}</li>
          ))}
        </ul>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={question.correctIndex}
            onChange={handleChange}
          >
            {question.answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleDelete}>Delete Question</button>
      </div>
    </li>
  );
}

export default QuestionItem;
