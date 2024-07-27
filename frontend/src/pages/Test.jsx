import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../config";
import 'tailwindcss/tailwind.css';

const TestMCQ = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch(
        `${BACKEND_URL}/api/f/test?id=${currentUser.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, [currentUser.id]);

  const handleOptionChange = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const handleSubmit = async () => {
    const payload = questions.map((question) => ({
      id: question.id,
      answer: answers[question.id],
    }));

    const res = await fetch(`${BACKEND_URL}/api/f/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <div className="container mx-auto p-4">
      {questions.map((question) => (
        <div key={question.id} className="mb-6 p-4 border rounded-lg shadow-lg bg-white">
          <h2 className="text-xl font-bold mb-4">{question.question}</h2>
          <div className="flex flex-col">
            {["optionA", "optionB", "optionC", "optionD"].map((optionKey) => (
              <label key={optionKey} className="mb-2">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={optionKey}
                  checked={answers[question.id] === optionKey}
                  onChange={() => handleOptionChange(question.id, optionKey)}
                  className="mr-2"
                />
                {question[optionKey]}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Submit
      </button>
    </div>
  );
};

export default TestMCQ;
