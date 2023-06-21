import { format, parseISO, parse } from "date-fns";
import React, { useState } from "react";
import uniqid from "uniqid";
import Icon from "@mdi/react";
import { mdiPlusCircle } from "@mdi/js";
import styles from "../styles/WorkExperience.module.css";

export const WorkInfoSection = () => {
  const [workData, setWorkData] = useState({
    companyName: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
    jobDescription: "",
    workID: uniqid(),
    currentlyEditingWorkID: "",
  });

  const [workDataArr, setWorkDataArr] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [submitMode, setSubmitMode] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkData({
      ...workData,
      [name]: value,
    });
  };

  const formatStartDate = (startDate) => {
    if (startDate === "") {
      return startDate;
    } else {
      const dateObj = parseISO(startDate);
      const formattedDateObj = format(dateObj, "MM/dd/yyyy");
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

  const submitWorkExperienceInfo = (e) => {
    e.preventDefault();

    const formattedStartDate = formatStartDate(workData.startDate);

    const formattedEndDate = formatEndDate(workData.endDate);

    setWorkDataArr([
      ...workDataArr,
      {
        ...workData,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      },
    ]);

    setWorkData({
      companyName: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      jobDescription: "",
      workID: uniqid(),
      currentlyEditingWorkID: workData.currentlyEditingWorkID,
    });

    setSubmitMode(false);
  };

  const saveWorkItem = (e) => {
    e.preventDefault();

    setWorkDataArr(
      workDataArr.map((item) => {
        if (item.workID === workData.currentlyEditingWorkID) {
          return {
            ...workData,
            workID: workData.currentlyEditingWorkID,
            currentlyEditingWorkID: "",
            startDate: formatStartDate(workData.startDate),
            endDate: formatEndDate(workData.endDate),
          };
        } else {
          return item;
        }
      })
    );

    setWorkData({
      companyName: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      jobDescription: "",
      workID: uniqid(),
      currentlyEditingWorkID: workData.currentlyEditingWorkID,
    });

    setEditMode(false);
  };

  const addWorkExperience = () => {
    setWorkData({
      ...workData,
      workID: uniqid(),
    });

    setSubmitMode(true);
  };

  const editWorkInfo = (workItem) => {
    const targetWorkItem = workDataArr.find((item) => {
      return item.workID === workItem.workID;
    });

    const parsedStartDate =
      targetWorkItem.startDate !== ""
        ? parse(targetWorkItem.startDate, "MM/dd/yyyy", new Date())
        : targetWorkItem.startDate;

    const startDate =
      parsedStartDate === ""
        ? parsedStartDate
        : format(parsedStartDate, "yyyy-MM-dd");

    const parsedEndDate =
      targetWorkItem.endDate !== ""
        ? parse(targetWorkItem.endDate, "MM/dd/yyyy", new Date())
        : targetWorkItem.endDate;

    const endDate =
      parsedEndDate === ""
        ? parsedEndDate
        : format(parsedEndDate, "yyyy-MM-dd");

    setWorkData({
      companyName: targetWorkItem.companyName,
      jobTitle: targetWorkItem.jobTitle,
      startDate: startDate,
      endDate: endDate,
      jobDescription: targetWorkItem.jobDescription,
      workID: "",
      currentlyEditingWorkID: targetWorkItem.workID,
    });

    setEditMode(true);
  };

  if (editMode === true) {
    return (
      <EditView
        workData={workData}
        handleInputChange={handleInputChange}
        saveWorkItem={saveWorkItem}
      />
    );
  } else if (submitMode === true) {
    return (
      <SubmitView
        workData={workData}
        handleInputChange={handleInputChange}
        submitWorkExperienceInfo={submitWorkExperienceInfo}
      ></SubmitView>
    );
  }

  if (editMode === false && workDataArr.length !== 0) {
    return (
      <ReadView
        workDataArr={workDataArr}
        editWorkInfo={editWorkInfo}
        addWorkExperience={addWorkExperience}
      />
    );
  }
};

const EditView = ({ workData, handleInputChange, saveWorkItem }) => {
  return (
    <>
      <div>
        <form
          noValidate
          onSubmit={saveWorkItem}
          className={styles.workExperienceForm}
        >
          <div className={styles.companyName}>
            <label>Enter the company name</label>
            <input
              placeholder="Apple"
              type="text"
              name="companyName"
              value={workData.companyName}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className={styles.jobTitle}>
            <label>Enter your job title:</label>
            <input
              placeholder="Senior Engineer"
              type="text"
              name="jobTitle"
              value={workData.jobTitle}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className={styles.startDate}>
            <label>Enter your start Date</label>
            <input
              type="date"
              name="startDate"
              value={workData.startDate}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className={styles.endDate}>
            <label>Enter the end date</label>
            <input
              type="date"
              name="endDate"
              value={workData.endDate}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className={styles.jobDescription}>
            <label>Enter some information about your role</label>
            <textarea
              name="jobDescription"
              value={workData.jobDescription}
              onChange={handleInputChange}
              cols={40}
              rows={8}
              maxLength={300}
              placeholder="Enter some information about what you did in this position"
            ></textarea>
          </div>
          <button type="submit" className={styles.saveBtn}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

const SubmitView = ({
  workData,
  handleInputChange,
  submitWorkExperienceInfo,
}) => {
  return (
    <>
      <div>
        <form
          noValidate
          onSubmit={submitWorkExperienceInfo}
          className={styles.workExperienceForm}
        >
          <div className={styles.companyName}>
            <label>Enter the company name</label>
            <input
              placeholder="Apple"
              type="text"
              name="companyName"
              value={workData.companyName}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className={styles.jobTitle}>
            <label>Enter your job title:</label>
            <input
              placeholder="Senior Engineer"
              type="text"
              name="jobTitle"
              value={workData.jobTitle}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className={styles.startDate}>
            <label>Enter your start Date</label>
            <input
              type="date"
              name="startDate"
              value={workData.startDate}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className={styles.endDate}>
            <label>Enter the end date</label>
            <input
              type="date"
              name="endDate"
              value={workData.endDate}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className={styles.jobDescription}>
            <label>Enter some information about your role</label>
            <textarea
              name="jobDescription"
              value={workData.jobDescription}
              onChange={handleInputChange}
              cols={40}
              rows={8}
              maxLength={300}
              placeholder=""
            ></textarea>
          </div>
          <button className={styles.submitBtn} type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

const ReadView = ({ workDataArr, editWorkInfo, addWorkExperience }) => {
  return (
    <>
      <div className={styles.readViewWorkContainer}>
        <AddWorkExperienceButton
          workDataArr={workDataArr}
          addWorkExperience={addWorkExperience}
        />
        {workDataArr.map((workItem) => (
          <div className={styles.readViewWorkExperience} key={workItem.workID}>
            <div className={styles.readViewObj}>
              <div className={styles.companyName}>
                <h3>Company Name</h3>
                <p>{workItem.companyName}</p>
              </div>

              <div className={styles.jobTitle}>
                <h3>Job Title</h3>
                <p>{workItem.jobTitle}</p>
              </div>

              <div className={styles.startDate}>
                <h3>Period of employment</h3>
                <p>
                  {workItem.startDate} - {workItem.endDate}
                </p>
              </div>

              <div className={styles.jobDescription}>
                <h3>Job Description</h3>
                <p>{workItem.jobDescription}</p>
              </div>
            </div>
            <button onClick={() => editWorkInfo(workItem)}>Edit</button>
          </div>
        ))}
      </div>
    </>
  );
};

const AddWorkExperienceButton = ({ workDataArr, addWorkExperience }) => {
  if (workDataArr.length === 0) {
    return null;
  } else if (workDataArr.length !== 0) {
    return (
      <>
        <button className={styles.addWorkExpBtn} onClick={addWorkExperience}>
          <Icon path={mdiPlusCircle} size={1.2} />
          Add work experience
        </button>
      </>
    );
  }
};
