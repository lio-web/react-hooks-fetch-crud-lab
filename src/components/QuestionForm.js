import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name.startsWith("answer")) {
      const index = parseInt(name.slice(-1)) - 1;
      setFormData((prevData) => {
        const newAnswers = [...prevData.answers];
        newAnswers[index] = value;
        return { ...prevData, answers: newAnswers };
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddQuestion(formData);
    setFormData({
      prompt: "",
      answers: ["", "", "", ""],
      correctIndex: 0,
    });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        {[1, 2, 3, 4].map((num) => (
          <label key={num}>
            Answer {num}:
            <input
              type="text"
              name={`answer${num}`}
              value={formData.answers[num - 1]}
              onChange={handleChange}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {formData.answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
