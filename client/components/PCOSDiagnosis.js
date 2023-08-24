import React, { useState } from "react";

function PCOSDiagnosis() {
  const symptoms = [
    "Do you experience menstrual irregularity?",
    "Do you have excess hair growth?",
    "Do you suffer from acne?",
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (answer) => {
    if (answer === "yes") {
      setYesCount(yesCount + 1);
    }

    if (currentQuestion < symptoms.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div>
      {!completed ? (
        <div>
          <p>{symptoms[currentQuestion]}</p>
          <button onClick={() => handleAnswer("yes")}>Yes</button>
          <button onClick={() => handleAnswer("no")}>No</button>
        </div>
      ) : (
        <div>
          {yesCount > 2 ? (
            <p>
              You might have PCOS. Please consult with a healthcare
              professional.
            </p>
          ) : (
            <p>
              You might not have PCOS, but always consult with a healthcare
              professional for a conclusive diagnosis.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default PCOSDiagnosis;
