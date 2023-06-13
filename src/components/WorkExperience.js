import { format, parseISO, parse } from "date-fns";
import React, { useState } from "react";
import uniqid from "uniqid";
import "../styles/WorkExperience.css";

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

  const handleCompanyNameChange = (e) => {
    setWorkData({
      ...workData,
      companyName: e.target.value,
    });
  };

  const handleJobTitleChange = (e) => {
    setWorkData({
      ...workData,
      jobTitle: e.target.value,
    });
  };

  const handleStartDateChange = (e) => {
    setWorkData({
      ...workData,
      startDate: e.target.value,
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

  const handleEndDateChange = (e) => {
    setWorkData({
      ...workData,
      endDate: e.target.value,
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

  const handleJobDescriptionChange = (e) => {
    setWorkData({
      ...workData,
      jobDescription: e.target.value,
    });
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
        handleCompanyNameChange={handleCompanyNameChange}
        handleJobTitleChange={handleJobTitleChange}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        handleJobDescriptionChange={handleJobDescriptionChange}
        saveWorkItem={saveWorkItem}
      />
    );
  } else if (submitMode === true) {
    return (
      <SubmitView
        workData={workData}
        handleCompanyNameChange={handleCompanyNameChange}
        handleJobTitleChange={handleJobTitleChange}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        handleJobDescriptionChange={handleJobDescriptionChange}
        submitWorkExperienceInfo={submitWorkExperienceInfo}
      ></SubmitView>
    );
  }

  if (editMode === false && workDataArr.length !== 0) {
    return (
      <ReadView
        workDataArr={workDataArr}
        editWorkInfo={editWorkInfo}
        formatStartDate={formatStartDate}
        formatEndDate={formatEndDate}
        addWorkExperience={addWorkExperience}
      />
    );
  }
};

const EditView = ({
  workData,
  handleCompanyNameChange,
  handleJobTitleChange,
  handleStartDateChange,
  handleEndDateChange,
  handleJobDescriptionChange,
  saveWorkItem,
}) => {
  return (
    <>
      <div>
        <form noValidate onSubmit={saveWorkItem} className="workExperienceForm">
          <div className="companyName">
            <label>Enter the company name</label>
            <input
              placeholder="Apple"
              type="text"
              name="companyName"
              value={workData.companyName}
              onChange={handleCompanyNameChange}
            ></input>
          </div>
          <div className="jobTitle">
            <label>Enter your job title:</label>
            <input
              placeholder="Senior Engineer"
              type="text"
              name="jobTitle"
              value={workData.jobTitle}
              onChange={handleJobTitleChange}
            ></input>
          </div>
          <div className="startDate">
            <label>Enter your start Date</label>
            <input
              type="date"
              name="startDate"
              value={workData.startDate}
              onChange={handleStartDateChange}
            ></input>
          </div>
          <div className="endDate">
            <label>Enter the end date</label>
            <input
              type="date"
              name="endDate"
              value={workData.endDate}
              onChange={handleEndDateChange}
            ></input>
          </div>
          <div className="jobDescription">
            <label>Enter some information about your role</label>
            <textarea
              name="startDate"
              value={workData.jobDescription}
              onChange={handleJobDescriptionChange}
              cols={40}
              rows={8}
              maxLength={300}
              placeholder="Enter some information about what you did in this position"
            ></textarea>
          </div>
          <button type="submit" className="saveBtn">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

const SubmitView = ({
  workData,
  handleCompanyNameChange,
  handleJobTitleChange,
  handleStartDateChange,
  handleEndDateChange,
  handleJobDescriptionChange,
  submitWorkExperienceInfo,
}) => {
  return (
    <>
      <div>
        <form
          noValidate
          onSubmit={submitWorkExperienceInfo}
          className="workExperienceForm"
        >
          <div className="companyName">
            <label>Enter the company name</label>
            <input
              placeholder="Apple"
              type="text"
              name="companyName"
              value={workData.companyName}
              onChange={handleCompanyNameChange}
            ></input>
          </div>
          <div className="jobTitle">
            <label>Enter your job title:</label>
            <input
              placeholder="Senior Engineer"
              type="text"
              name="jobTitle"
              value={workData.jobTitle}
              onChange={handleJobTitleChange}
            ></input>
          </div>
          <div className="startDate">
            <label>Enter your start Date</label>
            <input
              type="date"
              name="startDate"
              value={workData.startDate}
              onChange={handleStartDateChange}
            ></input>
          </div>
          <div className="endDate">
            <label>Enter the end date</label>
            <input
              type="date"
              name="endDate"
              value={workData.endDate}
              onChange={handleEndDateChange}
            ></input>
          </div>
          <div className="jobDescription">
            <label>Enter some information about your role</label>
            <textarea
              name="startDate"
              value={workData.jobDescription}
              onChange={handleJobDescriptionChange}
              cols={40}
              rows={8}
              maxLength={300}
              placeholder=""
            ></textarea>
          </div>
          <button className="submitBtn" type="submit" style={{ width: "70px" }}>
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
      <div className="readViewWorkContainer">
        <AddWorkExperienceButton
          workDataArr={workDataArr}
          addWorkExperience={addWorkExperience}
        />
        {workDataArr.map((workItem) => (
          <div className="readViewWorkExperience" key={workItem.workID}>
            <div className="readViewObj">
              <div className="companyName">
                <h3>Company Name</h3>
                <p>{workItem.companyName}</p>
              </div>

              <div className="jobTitle">
                <h3>Job Title</h3>
                <p>{workItem.jobTitle}</p>
              </div>

              <div className="startDate">
                <h3>Start Date</h3>
                <p>{workItem.startDate}</p>
              </div>

              <div className="endDate">
                <h3>End Date</h3>
                <p>{workItem.endDate}</p>
              </div>
              <div className="jobDescription">
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
        <button onClick={addWorkExperience}>Add work experience</button>
      </>
    );
  }

  return <></>;
};
