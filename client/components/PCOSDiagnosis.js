import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchDoctors } from "../store/doctors";

const PCOSDiagnosis = ({ doctors, fetchDoctors }) => {
  const symptoms = [
    "Do you experience menstrual irregularity?",
    "Do you have excess hair growth, especially on your face, chest, or back?",
    "Do you suffer from acne?",
    "Have you noticed thinning hair or male-pattern baldness?",
    "Do you struggle with weight gain or obesity, especially around your waist?",
    "Do you have darkening of the skin, especially around your neck or armpits?",
    "Have you experienced prolonged or heavy periods?",
    "Have you noticed small, pearl-sized cysts on your ovaries during ultrasounds?",
    "Do you have skin tags, especially in the armpit or neck area?",
    "Do you suffer from frequent mood changes, including depression or anxiety?",
    "Do you face difficulty in conceiving?",
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (completed && yesCount > 4 && !doctors.length) {
      fetchDoctors();
    }
  }, [completed, yesCount, doctors.length]);

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
    <div className="pcos-diagnosis-wrapper">
      <div className="pcos-diagnosis-container">
        {!completed ? (
          <div>
            <p>{symptoms[currentQuestion]}</p>
            <button
              className="separated-button"
              onClick={() => handleAnswer("yes")}>
              Yes
            </button>
            <button
              className="separated-button"
              onClick={() => handleAnswer("no")}>
              No
            </button>
          </div>
        ) : (
          <div>
            {yesCount > 2 ? (
              <div>
                <p>
                  You might have PCOS. Please consult with a healthcare
                  professional.
                </p>
                <p>Contact one of the nearby GYN doctors:</p>
                <ul>
                  {doctors?.map((doctor, index) => (
                    <li key={index}>
                      {doctor.name},{" "}
                      <ul>
                        <li id="doctorsInfo">
                          {doctor.address}, {doctor.phone}, {doctor.website}{" "}
                        </li>
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>
                You might not have PCOS, but always consult with a healthcare
                professional for a conclusive diagnosis.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  doctors: state.doctors,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDoctors: () => dispatch(fetchDoctors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PCOSDiagnosis);
