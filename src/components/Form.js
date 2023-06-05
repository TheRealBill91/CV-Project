import React, { Component } from "react";
import { GeneralInfoSection } from "./GeneralInfo";
import { EducationExperienceSection } from "./EducationExperience";
import { WorkInfoSection } from "./WorkExperience";

// Parent component for form
export class FormOverview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <GeneralInfoSection></GeneralInfoSection>
        <EducationExperienceSection></EducationExperienceSection>
        <WorkInfoSection></WorkInfoSection>
      </>
    );
  }
}
