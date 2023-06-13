import React, { useState } from "react";
import uniqid from "uniqid";
import { parseISO, format, parse } from "date-fns";
import "../styles/EducationExperience.css";

export const EducationExperienceSection = () => {
  const [educationData, setEducationData] = useState({
    schoolNameInput: {
      schoolName: "",
    },
    titleOfStudyInput: {
      titleOfStudy: "",
    },
    dateOfStudyInput: {
      startDate: "",
      endDate: "",
    },

    currentlyEditingExperienceID: "",
    educationExperienceID: uniqid(),
  });

  const [educationDataArr, setEducationDataArr] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [submitMode, setSubmitMode] = useState(true);

  const handleSchoolNameChange = (e) => {
    setEducationData({
      ...educationData,
      schoolNameInput: {
        schoolName: e.target.value,
      },
    });
  };

  const handleTitleOfStudyChange = (e) => {
    setEducationData({
      ...educationData,
      titleOfStudyInput: {
        titleOfStudy: e.target.value,
      },
    });
  };

  const handleStartDateOfStudy = (e) => {
    setEducationData({
      ...educationData,
      dateOfStudyInput: {
        startDate: e.target.value,
        endDate: educationData.dateOfStudyInput.endDate,
      },
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

  const handleEndDateOfStudy = (e) => {
    setEducationData({
      ...educationData,
      dateOfStudyInput: {
        startDate: educationData.dateOfStudyInput.startDate,
        endDate: e.target.value,
      },
    });
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
    const formattedStartDate = formatStartDate(
      educationData.dateOfStudyInput.startDate
    );
    const formattedEndDate = formatEndDate(
      educationData.dateOfStudyInput.endDate
    );

    setEducationDataArr([
      ...educationDataArr,
      {
        ...educationData,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      },
    ]);

    setEducationData({
      schoolNameInput: {
        schoolName: "",
      },
      titleOfStudyInput: {
        titleOfStudy: "",
      },
      dateOfStudyInput: {
        startDate: "",
        endDate: "",
      },
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

            startDate: formatStartDate(
              educationData.dateOfStudyInput.startDate
            ),
            endDate: formatEndDate(educationData.dateOfStudyInput.endDate),
          };
        } else {
          return item;
        }
      })
    );

    setEducationData({
      schoolNameInput: {
        schoolName: "",
      },
      titleOfStudyInput: {
        titleOfStudy: "",
      },
      dateOfStudyInput: {
        startDate: "",
        endDate: "",
      },
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
      schoolNameInput: {
        schoolName: targetEducationItem.schoolNameInput.schoolName,
      },
      titleOfStudyInput: {
        titleOfStudy: targetEducationItem.titleOfStudyInput.titleOfStudy,
      },
      dateOfStudyInput: {
        startDate: startDate,
        endDate: endDate,
      },
      educationExperienceID: "",
      currentlyEditingExperienceID: targetEducationItem.educationExperienceID,
    });

    setEditMode(true);
  };

  if (editMode === true) {
    return (
      <EditView
        schoolNameInput={educationData.schoolNameInput}
        dateOfStudyInput={educationData.dateOfStudyInput}
        titleOfStudyInput={educationData.titleOfStudyInput}
        handleSchoolNameChange={handleSchoolNameChange}
        handleTitleOfStudyChange={handleTitleOfStudyChange}
        handleStartDateOfStudy={handleStartDateOfStudy}
        handleEndDateOfStudy={handleEndDateOfStudy}
        saveEducationItem={saveEducationItem}
      ></EditView>
    );
  } else if (submitMode === true) {
    return (
      <SubmitView
        schoolNameInput={educationData.schoolNameInput}
        dateOfStudyInput={educationData.dateOfStudyInput}
        titleOfStudyInput={educationData.titleOfStudyInput}
        handleSchoolNameChange={handleSchoolNameChange}
        handleTitleOfStudyChange={handleTitleOfStudyChange}
        handleStartDateOfStudy={handleStartDateOfStudy}
        handleEndDateOfStudy={handleEndDateOfStudy}
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

const EditView = ({
  schoolNameInput,
  dateOfStudyInput,
  titleOfStudyInput,
  handleSchoolNameChange,
  handleTitleOfStudyChange,
  handleStartDateOfStudy,
  handleEndDateOfStudy,
  saveEducationItem,
}) => {
  return (
    <>
      <div style={{ marginBottom: "24px" }}>
        <form
          noValidate
          onSubmit={saveEducationItem}
          className="educationExperienceForm"
        >
          <div className="schoolName">
            <label>Enter your school/University Name:</label>
            <input
              placeholder="Harvard"
              type="text"
              name="schoolName"
              value={schoolNameInput.schoolName}
              onChange={handleSchoolNameChange}
              required
            ></input>
          </div>

          <div className="titleOfStudy">
            <label>Enter your title of study</label>
            <input
              placeholder="B.S Economics"
              name="titleOfStudy"
              type="titleOfStudy"
              value={titleOfStudyInput.titleOfStudy}
              onChange={handleTitleOfStudyChange}
            ></input>
          </div>

          <div className="startDate">
            <label>Enter the date you started</label>
            <input
              placeholder="07/06/2005"
              type="date"
              name="startDate"
              value={dateOfStudyInput.startDate}
              onChange={handleStartDateOfStudy}
            ></input>
          </div>

          <div className="endDate">
            <label>Enter the date you ended</label>
            <input
              placeholder="11/06/2005"
              type="date"
              name="endDate"
              value={dateOfStudyInput.endDate}
              onChange={handleEndDateOfStudy}
            ></input>
          </div>
          <button className="saveBtn" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

const SubmitView = ({
  schoolNameInput,
  dateOfStudyInput,
  titleOfStudyInput,
  handleSchoolNameChange,
  handleTitleOfStudyChange,
  handleStartDateOfStudy,
  handleEndDateOfStudy,
  submitEducationInfo,
}) => {
  return (
    <>
      <div style={{ marginBottom: "24px" }}>
        <form
          noValidate
          onSubmit={submitEducationInfo}
          className="educationExperienceForm"
        >
          <div className="schoolName">
            <label>Enter your school/University Name:</label>
            <input
              placeholder="Harvard"
              type="text"
              name="schoolName"
              value={schoolNameInput.schoolName}
              onChange={handleSchoolNameChange}
              required
            ></input>
          </div>

          <div className="titleOfStudy">
            <label>Enter your title of study</label>
            <input
              placeholder="B.S Economics"
              name="titleOfStudy"
              type="titleOfStudy"
              value={titleOfStudyInput.titleOfStudy}
              onChange={handleTitleOfStudyChange}
            ></input>
          </div>

          <div className="startDate">
            <label>Enter the date you started</label>
            <input
              placeholder="07/06/2005"
              type="date"
              name="startDate"
              value={dateOfStudyInput.startDate}
              onChange={handleStartDateOfStudy}
            ></input>
          </div>

          <div className="endDate">
            <label>Enter the date you ended</label>
            <input
              placeholder="11/06/2005"
              type="date"
              name="endDate"
              value={dateOfStudyInput.endDate}
              onChange={handleEndDateOfStudy}
            ></input>
          </div>
          <button className="submitBtn" style={{ width: "70px" }} type="submit">
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
      <div className="readViewEduationContainer">
        <AddEducationButton
          educationDataArr={educationDataArr}
          addEducationExperience={addEducationExperience}
        />
        {educationDataArr.map((educationItem) => (
          <div className="readViewEducation" key={uniqid()}>
            <div className="readViewObj">
              <div className="schoolName">
                <h3>School Name</h3>
                <p>{educationItem.schoolNameInput.schoolName}</p>
              </div>
              <div className="titleOfStudy">
                <h3>Title of Study</h3>
                <p>{educationItem.titleOfStudyInput.titleOfStudy}</p>
              </div>
              <div className="startDate">
                <h3>Start Date</h3>
                <p>{educationItem.startDate}</p>
              </div>
              <div className="endDate">
                <h3>End Date</h3>
                <p>{educationItem.endDate}</p>
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
        <button onClick={addEducationExperience}>Add education</button>
      </>
    );
  }
};
