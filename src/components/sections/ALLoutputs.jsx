import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PersonalInfoValidation from "./Personaldetails";
import ContactDetails from "./Contactdetails";
import FamilyDetails from "./Familydetails";
import EducationForm from "./Educationdetails";
import TechnicalSkills from "./Technicalskills";
import ProjectDetails from "./Projects";
import InternshipDetails from "./Internship";
import LanguageProficiency from "./Languages";
import Declaration from "./Declaration";

import "./application.css";

function AllOutputs() {
  const navigate = useNavigate();

  const [allData, setAllData] = useState({
    personal: {},
    contact: {},
    family: {
      father: {},
      mother: {},
      guardian: {},
    },
    education: {
      ssc: {},
      inter: {},
      graduation: {},
      postGraduation: {},
    },
    technicalSkills: {
      programming: { technologies: "", level: "", remarks: "" },
      frameworks: { technologies: "", level: "", remarks: "" },
      databases: { technologies: "", level: "", remarks: "" },
      cloud: { technologies: "", level: "", remarks: "" },
      os: { technologies: "", level: "", remarks: "" },
      other: { technologies: "", level: "", remarks: "" },
    },
    projects: Array(5).fill({
      title: "",
      type: "",
      technologies: "",
      description: "",
      role: "",
    }),
    internships: Array(2).fill({
      organization: "",
      duration: "",
      domain: "",
      certificate: "",
    }),
    languages: {
      English: { read: "", write: "", speak: "" },
      Hindi: { read: "", write: "", speak: "" },
      Regional: { read: "", write: "", speak: "" },
      Others: { read: "", write: "", speak: "" },
    },
    declaration: {
      name: "",
      date: "",
      place: "",
      sign: "",
    },
  });

  const [submitAttempted, setSubmitAttempted] = useState(false);

  // ---------- SECTION SETTER ----------
  const sectionSetter = (section) => (updater) =>
    setAllData((prev) => ({
      ...prev,
      [section]:
        typeof updater === "function" ? updater(prev[section]) : updater,
    }));

  // ---------- CHECK EMPTY FIELDS ----------
  const hasEmptyFields = (obj) => {
    if (Array.isArray(obj)) {
      return obj.some(hasEmptyFields);
    }
    if (typeof obj === "object" && obj !== null) {
      return Object.values(obj).some(hasEmptyFields);
    }
    return obj === "" || obj === null || obj === undefined;
  };

  // ---------- SUBMIT ALL DATA ----------
  const handleSubmitAll = async () => {
    setSubmitAttempted(true);

    if (hasEmptyFields(allData)) {
      alert("Please fill all required fields before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Submission failed");
        return;
      }

      // ✅ Redirect to success page with Application ID
      navigate("/success", {
        state: { applicationId: result.id },
      });

    } catch (error) {
      console.error(error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="app-container">

      <PersonalInfoValidation
        data={allData.personal}
        setData={sectionSetter("personal")}
        submitAttempted={submitAttempted}
      />

      <ContactDetails
        data={allData.contact}
        setData={sectionSetter("contact")}
        submitAttempted={submitAttempted}
      />

      <FamilyDetails
        data={allData.family}
        setData={sectionSetter("family")}
        submitAttempted={submitAttempted}
      />

      <EducationForm
        data={allData.education}
        setData={sectionSetter("education")}
        submitAttempted={submitAttempted}
      />

      <TechnicalSkills
        data={allData.technicalSkills}
        setData={sectionSetter("technicalSkills")}
        submitAttempted={submitAttempted}
      />

      <ProjectDetails
        data={allData.projects}
        setData={sectionSetter("projects")}
        submitAttempted={submitAttempted}
      />

      <InternshipDetails
        data={allData.internships}
        setData={sectionSetter("internships")}
        submitAttempted={submitAttempted}
      />

      <LanguageProficiency
        data={allData.languages}
        setData={sectionSetter("languages")}
        submitAttempted={submitAttempted}
      />

      <Declaration
        data={allData.declaration}
        setData={sectionSetter("declaration")}
        submitAttempted={submitAttempted}
      />

      <div className="submit-wrapper">
        <button className="submit-btn" onClick={handleSubmitAll}>
          SUBMIT APPLICATION
        </button>
      </div>

    </div>
  );
}

export default AllOutputs;
