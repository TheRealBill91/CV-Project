import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import { parseISO, format, parse } from "date-fns";
import Icon from "@mdi/react";
import { mdiPlusCircle } from "@mdi/js";
import styles from "../styles/EducationExperience.module.css";

export const EducationExperienceSection = () => {
  const [educationData, setEducationData] = useState({
    schoolName: "",
    titleOfStudy: "",
    startDate: "",
    endDate: "",
    currentlyEditingExperienceID: "",
    educationExperienceID: uniqid(),
  });

  const [educationDataArr, setEducationDataArr] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [submitMode, setSubmitMode] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducationData({
      ...educationData,
      [name]: value,
    });
  };

  const formatStartDate = (startDate) => {
    console.log(startDate);
    if (startDate === "") {
      return startDate;
    } else {
      const dateObj = parseISO(startDate);
      const formattedDateObj = format(dateObj, "MM/dd/yyyy");
      console.log(formattedDateObj);

      return formattedDateObj;
    }
  };

  const formatEndDate = (endDate) => {
    if (endDate === "") {
      return endDate;
    } else {
      const dateObj = parseISO(endDate);
      const formattedDateObj = format(dateObj, "MM/dd/yyyy");
      return formattedDateObj;
    }
  };

  const submitEducationInfo = (e) => {
    e.preventDefault();
    const formattedStartDate = formatStartDate(educationData.startDate);
    const formattedEndDate = formatEndDate(educationData.endDate);

    setEducationDataArr([
      ...educationDataArr,
      {
        ...educationData,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      },
    ]);

    setEducationData({
      schoolName: "",
      titleOfStudy: "",
      startDate: "",
      endDate: "",
      educationExperienceID: uniqid(),
      currentlyEditingExperienceID: educationData.currentlyEditingExperienceID,
    });

    setSubmitMode(false);
  };

  const saveEducationItem = (e) => {
    e.preventDefault();
    setEducationDataArr(
      educationDataArr.map((item) => {
        if (
          item.educationExperienceID ===
          educationData.currentlyEditingExperienceID
        ) {
          return {
            ...educationData,
            educationExperienceID: educationData.currentlyEditingExperienceID,
            currentlyEditingExperienceID: "",
            startDate: formatStartDate(educationData.startDate),
            endDate: formatEndDate(educationData.endDate),
          };
        } else {
          return item;
        }
      })
    );

    setEducationData({
      schoolName: "",
      titleOfStudy: "",
      startDate: "",
      endDate: "",
      currentlyEditingExperienceID: educationData.currentlyEditingExperienceID,
    });

    setEditMode(false);
  };

  const addEducationExperience = () => {
    setEducationData({
      ...educationData,
      educationExperienceID: uniqid(),
    });
    setSubmitMode(true);
  };

  const editEducationInfo = (educationItem) => {
    const targetEducationItem = educationDataArr.find((item) => {
      return item.educationExperienceID === educationItem.educationExperienceID;
    });

    const parsedStartDate =
      targetEducationItem.startDate !== ""
        ? parse(targetEducationItem.startDate, "MM/dd/yyyy", new Date())
        : targetEducationItem.startDate;

    const startDate =
      parsedStartDate === ""
        ? parsedStartDate
        : format(parsedStartDate, "yyyy-MM-dd");

    const parsedEndDate =
      targetEducationItem.endDate !== ""
        ? parse(targetEducationItem.endDate, "MM/dd/yyyy", new Date())
        : targetEducationItem.endDate;

    const endDate =
      parsedEndDate === ""
        ? parsedEndDate
        : format(parsedEndDate, "yyyy-MM-dd");

    setEducationData({
      schoolName: targetEducationItem.schoolName,
      titleOfStudy: targetEducationItem.titleOfStudy,
      startDate: startDate,
      endDate: endDate,
      educationExperienceID: "",
      currentlyEditingExperienceID: targetEducationItem.educationExperienceID,
    });

    setEditMode(true);
  };

  if (editMode === true) {
    return (
      <EditView
        educationData={educationData}
        handleInputChange={handleInputChange}
        saveEducationItem={saveEducationItem}
      ></EditView>
    );
  } else if (submitMode === true) {
    return (
      <SubmitView
        educationData={educationData}
        handleInputChange={handleInputChange}
        submitEducationInfo={submitEducationInfo}
      ></SubmitView>
    );
  }
  if (editMode === false && educationDataArr.length !== 0) {
    return (
      <ReadView
        educationDataArr={educationDataArr}
        addEducationExperience={addEducationExperience}
        editEducationInfo={editEducationInfo}
        formatStartDate={formatStartDate}
        formatEndDate={formatEndDate}
      ></ReadView>
    );
  }
};

const EditView = ({ educationData, handleInputChange, saveEducationItem }) => {
  return (
    <>
      <div style={{ marginBottom: "24px" }}>
        <form
          noValidate
          onSubmit={saveEducationItem}
          className={styles.educationExperienceForm}
        >
          <div className={styles.schoolName}>
            <label>Enter your school/University Name:</label>
            <input
              placeholder="Harvard"
              type="text"
              name="schoolName"
              value={educationData.schoolName}
              onChange={handleInputChange}
              required
            ></input>
          </div>

          <div className={styles.titleOfStudy}>
            <label>Enter your title of study</label>
            <input
              placeholder="B.S Economics"
              name="titleOfStudy"
              type="titleOfStudy"
              value={educationData.titleOfStudy}
              onChange={handleInputChange}
            ></input>
          </div>

          <div className={styles.startDate}>
            <label>Enter the date you started</label>
            <input
              placeholder="07/06/2005"
              type="date"
              name="startDate"
              value={educationData.startDate}
              onChange={handleInputChange}
            ></input>
          </div>

          <div className={styles.endDate}>
            <label>Enter the date you ended</label>
            <input
              placeholder="11/06/2005"
              type="date"
              name="endDate"
              value={educationData.endDate}
              onChange={handleInputChange}
            ></input>
          </div>
          <button className={styles.saveBtn} type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

const SubmitView = ({
  educationData,
  handleInputChange,
  submitEducationInfo,
}) => {
  return (
    <>
      <div style={{ marginBottom: "24px" }}>
        <form
          noValidate
          onSubmit={submitEducationInfo}
          className={styles.educationExperienceForm}
        >
          <div className={styles.schoolName}>
            <label>Enter your school/University Name:</label>
            <input
              placeholder="Harvard"
              type="text"
              name="schoolName"
              value={educationData.schoolName}
              onChange={handleInputChange}
              required
            ></input>
          </div>

          <div className={styles.titleOfStudy}>
            <label>Enter your title of study</label>
            <input
              placeholder="B.S Economics"
              name="titleOfStudy"
              type="titleOfStudy"
              value={educationData.titleOfStudy}
              onChange={handleInputChange}
            ></input>
          </div>

          <div className={styles.startDate}>
            <label>Enter the date you started</label>
            <input
              placeholder="07/06/2005"
              type="date"
              name="startDate"
              value={educationData.startDate}
              onChange={handleInputChange}
            ></input>
          </div>

          <div className={styles.startDate}>
            <label>Enter the date you ended</label>
            <input
              placeholder="11/06/2005"
              type="date"
              name="endDate"
              value={educationData.endDate}
              onChange={handleInputChange}
            ></input>
          </div>
          <button
            className={styles.submitBtn}
            style={{ width: "70px" }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

const ReadView = ({
  educationDataArr,
  editEducationInfo,
  addEducationExperience,
}) => {
  return (
    <>
      <div className={styles.readViewEduationContainer}>
        <AddEducationButton
          educationDataArr={educationDataArr}
          addEducationExperience={addEducationExperience}
        />
        {educationDataArr.map((educationItem) => (
          <div
            className={styles.readViewEducation}
            key={educationItem.educationExperienceID}
          >
            <div className={styles.readViewObj}>
              <div className={styles.schoolName}>
                <h3>School Name</h3>
                <p>{educationItem.schoolName}</p>
              </div>
              <div className={styles.titleOfStudy}>
                <h3>Title of Study</h3>
                <p>{educationItem.titleOfStudy}</p>
              </div>
              <div className={styles.startDate}>
                <h3>Period of enrollment</h3>
                <p>
                  {educationItem.startDate} - {educationItem.endDate}
                </p>
              </div>
            </div>
            <button onClick={() => editEducationInfo(educationItem)}>
              Edit
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

const AddEducationButton = ({ educationDataArr, addEducationExperience }) => {
  if (educationDataArr.length === 0) {
    return null;
  } else if (educationDataArr.length !== 0) {
    return (
      <>
        <button
          className={styles.addEducationBtn}
          onClick={addEducationExperience}
        >
          <Icon path={mdiPlusCircle} size={1.2} />
          Add education
        </button>
      </>
    );
  }
};
