import React, { useState } from "react";
import uniqid from "uniqid";
import styles from "../styles/GeneralInfo.module.css";

export const GeneralInfoSection = () => {
  const [generalData, setGeneralData] = useState({
    name: "",
    email: "",
    phoneNum: "",
    id: uniqid(),
  });

  const [generalDataArr, setGeneralDataArr] = useState([]);
  const [editMode, setEditMode] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGeneralData({
      ...generalData,
      [name]: value,
    });
  };

  const submitGeneralInfo = (e) => {
    e.preventDefault();

    setGeneralDataArr([
      ...generalDataArr,
      generalData.name,
      generalData.email,
      generalData.phoneNum,
      generalData.id,
    ]);

    setGeneralData({
      name: "",
      email: "",
      phoneNum: "",
      id: uniqid(),
    });

    setEditMode(false);
  };

  const editGeneralInfo = () => {
    setGeneralData({
      name: generalDataArr[0],
      email: generalDataArr[1],
      phoneNum: generalDataArr[2],
      id: generalDataArr[3],
    });

    setGeneralDataArr([]);
    setEditMode(true);
  };

  if (editMode === true) {
    return (
      <EditView
        generalData={generalData}
        handleInputChange={handleInputChange}
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

const EditView = ({ generalData, handleInputChange, submitGeneralInfo }) => {
  return (
    <>
      <div style={{ marginBottom: "24px" }}>
        <form
          noValidate
          onSubmit={submitGeneralInfo}
          className={styles.generalInfoForm}
        >
          <div className={styles.fullName}>
            <label>Enter full name:</label>
            <input
              placeholder="John Appleseed"
              type="text"
              name="name"
              value={generalData.name}
              onChange={handleInputChange}
            ></input>
          </div>

          <div className={styles.email}>
            <label>Enter your email address:</label>
            <input
              placeholder="JohnAppleseed@aol.com"
              name="email"
              type="email"
              value={generalData.email}
              onChange={handleInputChange}
            ></input>
          </div>

          <div className={styles.phoneNumber}>
            <label>Enter your phone number:</label>
            <input
              placeholder="(495)-564-4034"
              type="tel"
              name="phoneNum"
              pattern="\(\d{3}\)\s\d{3}-\d{4}"
              value={generalData.phoneNum}
              onChange={handleInputChange}
            ></input>
          </div>
          <button className={styles.submitBtn} type="submit">
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
      <div className={styles.readViewContainer}>
        <div className={styles.readViewGeneral}>
          <div className={styles.fullName}>
            <h2>{generalDataArr[0]}</h2>
          </div>
          <div className={styles.readViewObj}>
            <div className={styles.email}>
              <p>{generalDataArr[1]}</p>
            </div>

            <div className={styles.phoneNumber}>
              <p>{generalDataArr[2]}</p>
            </div>
          </div>
          <button onClick={editGeneralInfo}>Edit</button>
        </div>
      </div>
    </>
  );
};
