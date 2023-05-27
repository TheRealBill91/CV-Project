import React, { Component } from "react";
import "../styles/FormSection.css";

// Parent component for form
export class FormOverview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            generalData,
            generalDataArr,
            handleNameChange,
            handleEmailChange,
            handlePhoneNumChange,
            submitGeneralInfo,
        } = this.props;
        return (
            <>
                <h3>General Information</h3>
                <GeneralInfoSection
                    generalData={generalDataArr}
                    generalInput={generalData}
                    handleNameChange={handleNameChange}
                    handleEmailChange={handleEmailChange}
                    handlePhoneNumChange={handlePhoneNumChange}
                    submitGeneralInfo={submitGeneralInfo}
                ></GeneralInfoSection>
            </>
        );
    }
}

// Component for rendering each of the three form sections
// general info, education info, and practical info (past experience)

class GeneralInfoSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            generalData,
            generalInput,
            handleNameChange,
            handleEmailChange,
            handlePhoneNumChange,
            submitGeneralInfo,
        } = this.props;
        return (
            <>
                <div className="#GeneralInfo">
                    <form>
                        <label>Enter full name:</label>
                        <input
                            placeholder="John Appleseed"
                            type="text"
                            value={generalData}
                            onChange={handleNameChange}
                        ></input>
                        <label>Enter your email address:</label>
                        <input
                            placeholder="JohnAppleseed@aol.com"
                            type="email"
                            value={generalData}
                            onChange={handleEmailChange}
                        ></input>
                    </form>
                </div>
            </>
        );
    }
}
