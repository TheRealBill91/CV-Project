import { format, parseISO, formatISO, parse } from "date-fns";
import React, { Component } from "react";
import uniqid from "uniqid";
import "../styles/WorkExperience.css"

export class WorkInfoSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workExperienceInput: {
                companyName: "",
                jobTitle: "",
                startDate: "",
                endDate: "",
                jobDescription: "",
            },
            id: uniqid(),
            targetWorkObjID: "",
            workDataArr: [],
            editMode: false,
            submitMode: true,
        };

        this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
        this.handleJobTitleChange = this.handleJobTitleChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleJobDescriptionChange =
            this.handleJobDescriptionChange.bind(this);
        this.submitWorkExperienceInfo = this.submitWorkExperienceInfo.bind(this);
        this.editWorkInfo = this.editWorkInfo.bind(this);
        this.formatStartDate = this.formatStartDate.bind(this);
        this.formatEndDate = this.formatEndDate.bind(this);
        this.saveWorkItem = this.saveWorkItem.bind(this);
        this.addWorkExperience = this.addWorkExperience.bind(this);
    }

    handleCompanyNameChange(e) {
        this.setState({
            workExperienceInput: {
                companyName: e.target.value,
                jobTitle: this.state.workExperienceInput.jobTitle,
                startDate: this.state.workExperienceInput.startDate,
                endDate: this.state.workExperienceInput.endDate,
                jobDescription: this.state.workExperienceInput.jobDescription,
            },
            id: this.state.id,
            workDataArr: this.state.workDataArr,
            editMode: this.state.editMode,
        });
    }

    handleJobTitleChange(e) {
        this.setState({
            workExperienceInput: {
                companyName: this.state.workExperienceInput.companyName,
                jobTitle: e.target.value,
                startDate: this.state.workExperienceInput.startDate,
                endDate: this.state.workExperienceInput.endDate,
                jobDescription: this.state.workExperienceInput.jobDescription,
            },
            id: this.state.id,
            workDataArr: this.state.workDataArr,
            editMode: this.state.editMode,
        });
    }

    handleStartDateChange(e) {
        this.setState({
            workExperienceInput: {
                companyName: this.state.workExperienceInput.companyName,
                jobTitle: this.state.workExperienceInput.jobTitle,
                startDate: e.target.value,
                endDate: this.state.workExperienceInput.endDate,
                jobDescription: this.state.workExperienceInput.jobDescription,
            },
            id: this.state.id,
            workDataArr: this.state.workDataArr,
            editMode: this.state.editMode,
        });
    }

    formatStartDate(startDate) {
        if (startDate === "") {
            return startDate;
        } else {
            const dateObj = parseISO(startDate);
            const formattedDateObj = format(dateObj, "MM/dd/yyyy");
            return formattedDateObj;
        }
    }

    handleEndDateChange(e) {
        this.setState({
            workExperienceInput: {
                companyName: this.state.workExperienceInput.companyName,
                jobTitle: this.state.workExperienceInput.jobTitle,
                startDate: this.state.workExperienceInput.startDate,
                endDate: e.target.value,
                jobDescription: this.state.workExperienceInput.jobDescription,
            },
            id: this.state.id,
            workDataArr: this.state.workDataArr,
            editMode: this.state.editMode,
        });
    }

    formatEndDate(endDate) {
        if (endDate === "") {
            return endDate;
        } else {
            const dateObj = parseISO(endDate);
            const formattedDateObj = format(dateObj, "MM/dd/yyyy");
            return formattedDateObj;
        }
    }

    handleJobDescriptionChange(e) {
        this.setState({
            workExperienceInput: {
                companyName: this.state.workExperienceInput.companyName,
                jobTitle: this.state.workExperienceInput.jobTitle,
                startDate: this.state.workExperienceInput.startDate,
                endDate: this.state.workExperienceInput.endDate,
                jobDescription: e.target.value,
            },
            id: this.state.id,
            workDataArr: this.state.workDataArr,
            editMode: this.state.editMode,
        });
    }

    submitWorkExperienceInfo(e) {
        e.preventDefault();
        this.setState({
            workDataArr: this.state.workDataArr.concat({
                companyName: this.state.workExperienceInput.companyName,
                jobTitle: this.state.workExperienceInput.jobTitle,
                startDate: this.formatStartDate(
                    this.state.workExperienceInput.startDate
                ),
                endDate: this.formatEndDate(this.state.workExperienceInput.endDate),
                jobDescription: this.state.workExperienceInput.jobDescription,
                id: this.state.id,
            }),
            workExperienceInput: {
                companyName: "",
                jobTitle: "",
                startDate: "",
                endDate: "",
                jobDescription: "",
            },
            id: uniqid(),
            targetWorkObjID: this.state.targetWorkObjID,
            editMode: this.state.editMode,
            submitMode: false,
        });
    }

    saveWorkItem(e) {
        e.preventDefault();
        this.setState({
            workDataArr: this.state.workDataArr.map((item) => {
                if (item.id === this.state.targetWorkObjID) {
                    return {
                        companyName: this.state.workExperienceInput.companyName,
                        jobTitle: this.state.workExperienceInput.jobTitle,
                        startDate: this.formatStartDate(
                            this.state.workExperienceInput.startDate
                        ),
                        endDate: this.formatEndDate(this.state.workExperienceInput.endDate),
                        jobDescription: this.state.workExperienceInput.jobDescription,
                        id: this.state.id,
                    };
                } else {
                    return item;
                }
            }),
            workExperienceInput: {
                companyName: "",
                jobTitle: "",
                startDate: "",
                endDate: "",
                jobDescription: "",
            },
            editMode: false,
            targetWorkObjID: this.state.targetWorkObjID,
            submitMode: this.state.submitMode,
        });
    }

    addWorkExperience() {
        this.setState({
            workExperienceInput: {
                companyName: this.state.workExperienceInput.companyName,
                jobTitle: this.state.workExperienceInput.jobTitle,
                startDate: this.state.workExperienceInput.startDate,
                endDate: this.state.workExperienceInput.endDate,
                jobDescription: this.state.workExperienceInput.jobDescription,
            },
            id: uniqid(),
            targetWorkObjID: this.state.targetWorkObjID,
            editMode: this.state.editMode,
            workDataArr: this.state.workDataArr,
            submitMode: true,
        });
    }

    editWorkInfo(workItem) {
        const targetWorkItem = this.state.workDataArr.find((item) => {
            return item.id === workItem.id;
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

        this.setState({
            workExperienceInput: {
                companyName: targetWorkItem.companyName,
                jobTitle: targetWorkItem.jobTitle,
                startDate: startDate,
                endDate: endDate,
                jobDescription: targetWorkItem.jobDescription,
            },
            workDataArr: this.state.workDataArr,
            id: this.state.id,
            editMode: true,
            submitMode: this.state.submitMode,
            targetWorkObjID: targetWorkItem.id,
        });
    }

    render() {
        const { workExperienceInput, editMode, workDataArr, submitMode } =
            this.state;

        if (editMode === true) {
            return (
                <EditView
                    workExperienceInput={workExperienceInput}
                    handleCompanyNameChange={this.handleCompanyNameChange}
                    handleJobTitleChange={this.handleJobTitleChange}
                    handleStartDateChange={this.handleStartDateChange}
                    handleEndDateChange={this.handleEndDateChange}
                    handleJobDescriptionChange={this.handleJobDescriptionChange}
                    saveWorkItem={this.saveWorkItem}
                />
            );
        } else if (submitMode === true) {
            return (
                <SubmitView
                    workExperienceInput={workExperienceInput}
                    handleCompanyNameChange={this.handleCompanyNameChange}
                    handleJobTitleChange={this.handleJobTitleChange}
                    handleStartDateChange={this.handleStartDateChange}
                    handleEndDateChange={this.handleEndDateChange}
                    handleJobDescriptionChange={this.handleJobDescriptionChange}
                    submitWorkExperienceInfo={this.submitWorkExperienceInfo}
                ></SubmitView>
            );
        }

        if (editMode === false && workDataArr.length !== 0) {
            return (
                <ReadView
                    workDataArr={workDataArr}
                    editWorkInfo={this.editWorkInfo}
                    formatStartDate={this.formatStartDate}
                    formatEndDate={this.formatEndDate}
                    addWorkExperience={this.addWorkExperience}
                />
            );
        }
    }
}

class EditView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            workExperienceInput,
            handleCompanyNameChange,
            handleJobTitleChange,
            handleStartDateChange,
            handleEndDateChange,
            handleJobDescriptionChange,
            submitWorkExperienceInfo,
            saveWorkItem,
        } = this.props;

        return (
            <>
                <div>
                    <form
                        noValidate
                        onSubmit={saveWorkItem}
                        className="workExperienceForm"
                    >
                        <div className="companyName">
                            <label>Enter the company name</label>
                            <input
                                placeholder="Apple"
                                type="text"
                                name="companyName"
                                value={workExperienceInput.companyName}
                                onChange={handleCompanyNameChange}
                            ></input>
                        </div>
                        <div className="jobTitle">
                            <label>Enter your job title:</label>
                            <input
                                placeholder="Senior Engineer"
                                type="text"
                                name="jobTitle"
                                value={workExperienceInput.jobTitle}
                                onChange={handleJobTitleChange}
                            ></input>
                        </div>
                        <div className="startDate">
                            <label>Enter your start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={workExperienceInput.startDate}
                                onChange={handleStartDateChange}
                            ></input>
                        </div>
                        <div className="endDate">
                            <label>Enter the end date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={workExperienceInput.endDate}
                                onChange={handleEndDateChange}
                            ></input>
                        </div>
                        <div className="jobDescription">
                            <label>Enter some information about your role</label>
                            <textarea
                                name="startDate"
                                value={workExperienceInput.jobDescription}
                                onChange={handleJobDescriptionChange}
                                cols={40}
                                rows={8}
                                maxLength={200}
                                placeholder="Enter some information about what you did in this position"
                            ></textarea>
                            <button type="submit" style={{ width: "70px" }}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

class SubmitView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            workExperienceInput,
            handleCompanyNameChange,
            handleJobTitleChange,
            handleStartDateChange,
            handleEndDateChange,
            handleJobDescriptionChange,
            submitWorkExperienceInfo,
        } = this.props;

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
                                value={workExperienceInput.companyName}
                                onChange={handleCompanyNameChange}
                            ></input>
                        </div>
                        <div className="jobTitle">
                            <label>Enter your job title:</label>
                            <input
                                placeholder="Senior Engineer"
                                type="text"
                                name="jobTitle"
                                value={workExperienceInput.jobTitle}
                                onChange={handleJobTitleChange}
                            ></input>
                        </div>
                        <div className="startDate">
                            <label>Enter your start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={workExperienceInput.startDate}
                                onChange={handleStartDateChange}
                            ></input>
                        </div>
                        <div className="endDate">
                            <label>Enter the end date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={workExperienceInput.endDate}
                                onChange={handleEndDateChange}
                            ></input>
                        </div>
                        <div className="jobDescription">
                            <label>Enter some information about your role</label>
                            <textarea
                                name="startDate"
                                value={workExperienceInput.jobDescription}
                                onChange={handleJobDescriptionChange}
                                cols={40}
                                rows={8}
                                maxLength={200}
                                placeholder="Enter some information about what you did in this position"
                            ></textarea>
                            <button type="submit" style={{ width: "70px" }}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

class ReadView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { workDataArr, editWorkInfo, addWorkExperience } = this.props;

        return (
            <>
                <div className="readViewWorkContainer">
                    <AddWorkExperienceButton
                        workDataArr={workDataArr}
                        addWorkExperience={addWorkExperience}
                    />
                    {workDataArr.map((workItem) => (
                        <div className="readViewWorkExperience" key={workItem.id}>
                            <div className="readViewValues">
                                <div className="companyName">
                                    <h2>Company Name</h2>
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
                            <button
                                style={{ width: "40px" }}
                                onClick={() => editWorkInfo(workItem)}
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
            </>
        );
    }
}

class AddWorkExperienceButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { workDataArr, addWorkExperience } = this.props;

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
    }
}
