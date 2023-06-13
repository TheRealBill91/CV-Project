import React, { Component, useState } from "react";
import uniqid from "uniqid";
import "../styles/GeneralInfo.css";

export const GeneralInfoSection = () => {
  const [generalData, setGeneralData] = useState({
    nameInput: {
      name: "",
    },
    emailInput: {
      email: "",
    },
    phoneInput: {
      phoneNum: "",
    },

    id: uniqid(),
  });

  const [generalDataArr, setGeneralDataArr] = useState([]);
  const [editMode, setEditMode] = useState(true);

  const handleNameChange = (e) => {
    setGeneralData({
      ...generalData,
      nameInput: {
        name: e.target.value,
      },
    });
  };

  const handleEmailChange = (e) => {
    setGeneralData({
      ...generalData,
      emailInput: {
        email: e.target.value,
      },
    });
  };

  const handlePhoneNumChange = (e) => {
    setGeneralData({
      ...generalData,
      phoneInput: {
        phoneNum: e.target.value,
      },
    });
  };

  const submitGeneralInfo = (e) => {
    e.preventDefault();

    setGeneralDataArr([
      ...generalDataArr,
      generalData.nameInput.name,
      generalData.emailInput.email,
      generalData.phoneInput.phoneNum,
      generalData.id,
    ]);

    setGeneralData({
      nameInput: {
        name: "",
      },
      emailInput: {
        email: "",
      },
      phoneInput: {
        phoneNum: "",
      },
      id: uniqid(),
    });

    setEditMode(false);
  };

  const editGeneralInfo = () => {
    setGeneralData({
      nameInput: {
        name: generalDataArr[0],
      },
      emailInput: {
        email: generalDataArr[1],
      },
      phoneInput: {
        phoneNum: generalDataArr[2],
      },
      id: generalDataArr[3],
    });

    setGeneralDataArr([]);
    setEditMode(true);
  };

  if (editMode === true) {
    return (
      <EditView
        generalInput={generalData}
        handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange}
        handlePhoneNumChange={handlePhoneNumChange}
        submitGeneralInfo={submitGeneralInfo}
      />
    );
  } else if (editMode === false) {
    return (
      <ReadView
        generalDataArr={generalDataArr}
        editGeneralInfo={editGeneralInfo}
      />
    );
  }
};

const EditView = ({
  generalInput,
  handleNameChange,
  handleEmailChange,
  handlePhoneNumChange,
  submitGeneralInfo,
}) => {
  return (
    <>
      <div style={{ marginBottom: "24px" }}>
        <form
          noValidate
          onSubmit={submitGeneralInfo}
          className="generalInfoForm"
        >
          <div className="fullName">
            <label>Enter full name:</label>
            <input
              placeholder="John Appleseed"
              type="text"
              name="fullName"
              value={generalInput.nameInput.name}
              onChange={handleNameChange}
            ></input>
          </div>

          <div className="email">
            <label>Enter your email address:</label>
            <input
              placeholder="JohnAppleseed@aol.com"
              name="email"
              type="email"
              value={generalInput.emailInput.email}
              onChange={handleEmailChange}
            ></input>
          </div>

          <div className="phoneNumber">
            <label>Enter your phone number:</label>
            <input
              placeholder="(495)-564-4034"
              type="tel"
              name="telephone"
              pattern="\(\d{3}\)\s\d{3}-\d{4}"
              value={generalInput.phoneInput.phoneNum}
              onChange={handlePhoneNumChange}
            ></input>
          </div>
          <button className="submitBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

const ReadView = ({ generalDataArr, editGeneralInfo }) => {
  return (
    <>
      <div className="readViewContainer">
        <div className="readViewGeneral">
          <div className="readViewObj">
            <div className="fullName">
              <h2>Name</h2>
              <p>{generalDataArr[0]}</p>
            </div>

            <div className="email">
              <h3>Email</h3>
              <p>{generalDataArr[1]}</p>
            </div>

            <div className="phoneNumber">
              <h3>Phone Number</h3>
              <p>{generalDataArr[2]}</p>
            </div>
          </div>
          <button onClick={editGeneralInfo}>Edit</button>
        </div>
      </div>
    </>
  );
};
