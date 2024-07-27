import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../config";

const Test = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

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
    setResult(result.percentage);
  };

  const handlePrint = () => {
    window.print();
  };

  if (result !== null) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-6">
          {result >= 70 ? "Congratulations!" : "Failed"}
        </h1>
        <p className="text-xl mb-6">
          {result >= 70
            ? `You passed with ${result}%. You are now a certified trainer!`
            : `You scored ${result}%. Unfortunately, you did not pass. Please try again.`}
        </p>
        {result >= 70 && (
          <div className="border p-4 rounded-lg bg-white shadow-lg inline-block">
            <h2 className="text-2xl font-bold mb-4">Certificate of Achievement</h2>
            <p className="mb-4">This certifies that</p>
            <p className="text-xl font-bold mb-4">{currentUser.name}</p>
            <p>has successfully passed the training and is now a certified trainer.</p>
            <button
              onClick={handlePrint}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Download/Print Certificate
            </button>
          </div>
        )}
      </div>
    );
  }

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

export default Test;
