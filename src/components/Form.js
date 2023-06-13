import { GeneralInfoSection } from "./GeneralInfo";
import { EducationExperienceSection } from "./EducationExperience";
import { WorkInfoSection } from "./WorkExperience";

// Parent component for form
export const FormOverview = () => {
  return (
    <>
      <GeneralInfoSection></GeneralInfoSection>
      <EducationExperienceSection></EducationExperienceSection>
      <WorkInfoSection></WorkInfoSection>
    </>
  );
};
