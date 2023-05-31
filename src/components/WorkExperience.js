import { format, parseISO, formatISO } from "date-fns";
import React, { Component } from "react";
import uniqid from "uniqid";

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
            workDataArr: [],
            editMode: true,
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

    formatStartDate(workDataArr) {
        if (workDataArr[2] === "") {
            return workDataArr[2];
        } else {
            const dateObj = parseISO(workDataArr[2]);
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

    formatEndDate(workDataArr) {
        if (workDataArr[3] === "") {
            return workDataArr[3];
        } else {
            const dateObj = parseISO(workDataArr[3]);
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
            workDataArr: this.state.workDataArr.concat(
                this.state.workExperienceInput.companyName,
                this.state.workExperienceInput.jobTitle,
                this.state.workExperienceInput.startDate,
                this.state.workExperienceInput.endDate,
                this.state.workExperienceInput.jobDescription
            ),
            id: uniqid(),
            editMode: false,
        });
    }

    editWorkInfo() {
        this.setState({
            workExperienceInput: {
                companyName: this.state.workDataArr[0],
                jobTitle: this.state.workDataArr[1],
                startDate: this.state.workDataArr[2],
                endDate: this.state.workDataArr[3],
                jobDescription: this.state.workDataArr[4],
            },
            workDataArr: [],
            editMode: true,
        });
    }

    render() {
        const { workExperienceInput, editMode, workDataArr } = this.state;

        if (editMode === true) {
            return (
                <EditView
                    workExperienceInput={workExperienceInput}
                    handleCompanyNameChange={this.handleCompanyNameChange}
                    handleJobTitleChange={this.handleJobTitleChange}
                    handleStartDateChange={this.handleStartDateChange}
                    handleEndDateChange={this.handleEndDateChange}
                    handleJobDescriptionChange={this.handleJobDescriptionChange}
                    submitWorkExperienceInfo={this.submitWorkExperienceInfo}
                />
            );
        } else if (editMode === false) {
            return (
                <ReadView
                    workDataArr={workDataArr}
                    editWorkInfo={this.editWorkInfo}
                    formatStartDate={this.formatStartDate}
                    formatEndDate={this.formatEndDate}
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
                                Save
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
        const {
            workDataArr,
            editWorkInfo,
            workExperienceInput,
            formatStartDate,
            formatEndDate,
        } = this.props;

        const formattedStartDate = formatStartDate(workDataArr);
        const formattedEndDate = formatEndDate(workDataArr);

        return (
            <>
                <div>
                    <div className="companyName">
                        <h2>Company Name</h2>
                        <p>{workDataArr[0]}</p>
                    </div>

                    <div className="jobTitle">
                        <h3>Job Title</h3>
                        <p>{workDataArr[1]}</p>
                    </div>

                    <div className="startDate">
                        <h3>Start Date</h3>
                        <p>{formattedStartDate}</p>
                    </div>

                    <div className="endDate">
                        <h3>End Date</h3>
                        <p>{formattedEndDate}</p>
                    </div>
                    <div className="jobDescription">
                        <h3>Job Description</h3>
                        <p>{workDataArr[4]}</p>
                    </div>
                    <button onClick={editWorkInfo}>Edit</button>
                </div>
            </>
        );
    }
}
