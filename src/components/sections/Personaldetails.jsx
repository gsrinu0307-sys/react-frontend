import { useEffect, useState } from "react";

function PersonalInfoValidation({ data, setData, submitAttempted }) {
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(null);
  const [photoMessage, setPhotoMessage] = useState("");
  const [photoValid, setPhotoValid] = useState(null);

  // ---------- VALIDATE SINGLE FIELD ----------
  const validateField = (name, value) => {
    if (!value || !value.toString().trim()) {
      return "This field is required";
    }

    switch (name) {
      case "fullName":
        if (value.length < 3) return "Name must be at least 3 characters";
        break;

      case "dob": {
        const today = new Date().toISOString().split("T")[0];
        if (value > today) return "DOB cannot be in the future";
        break;
      }

      case "age":
        if (value < 1 || value > 120) return "Enter a valid age (1–120)";
        break;

      case "pan":
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value))
          return "Invalid PAN format (ABCDE1234F)";
        break;

      case "idNumber":
        if (value.length < 6) return "ID Number must be at least 6 characters";
        break;

      case "bloodGroup":
        if (!/^(A|B|AB|O)[+-]$/.test(value))
          return "Enter valid blood group (e.g., O+, AB-)";
        break;

      case "physical":
        if (!["Yes", "No"].includes(value))
          return "Enter Yes or No";
        break;

      default:
        break;
    }

    return "";
  };

  // ---------- HANDLE INPUT CHANGE ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ---------- VALIDATE PHOTO ----------
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setPhotoMessage("Photo is required");
      setPhotoValid(false);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setPhotoMessage("Only image files allowed");
      setPhotoValid(false);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoMessage("Image must be less than 2MB");
      setPhotoValid(false);
      return;
    }

    setPhoto(file);
    setPhotoMessage("Photo uploaded successfully");
    setPhotoValid(true);
    setData({ ...data, photo: file });
  };

  // ---------- VALIDATE ALL ON SUBMIT ----------
  useEffect(() => {
    if (!submitAttempted) return;

    const requiredFields = [
      "fullName",
      "gender",
      "dob",
      "age",
      "nationality",
      "maritalStatus",
      "idNumber",
      "pan",
      "bloodGroup",
      "physical",
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      const error = validateField(field, data[field] || "");
      if (error) newErrors[field] = error;
    });

    if (!photo) {
      setPhotoMessage("Photo is required");
      setPhotoValid(false);
    }

    setErrors(newErrors);
  }, [submitAttempted]);

  const showError = (field) =>
    errors[field] && (
      <div style={{ color: "red", fontSize: "12px" }}>{errors[field]}</div>
    );

  // ---------- STYLES ----------
  const labelStyle = {
    maxWidth: "90px",
    padding: "8px",
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
    border: "1px solid #000",
  };

  const inputCell = {
    padding: "8px",
    border: "1px solid #000",
  };

  const inputStyle = {
    width: "98%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  };

  const genderContainer = {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  };

  const photoContainer = {
    border: "1px solid #000",
    width: "140px",
    height: "180px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h3 style={{ textAlign: "center" }}>
        SECTION A – CANDIDATE PERSONAL INFORMATION
      </h3>

      {/* ✅ MOBILE SCROLL WRAPPER */}
      <div style={{ overflowX: "auto", width: "100%" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "750px",
          }}
        >
          <tbody>
            <tr>
              <td style={labelStyle}>Full Name</td>
              <td style={inputCell}>
                <input
                  style={inputStyle}
                  name="fullName"
                  value={data.fullName || ""}
                  onChange={handleChange}
                />
                {showError("fullName")}
              </td>

              <td
                rowSpan="6"
                style={{
                  width: "180px",
                  textAlign: "center",
                  border: "1px solid #000",
                }}
              >
                <div style={photoContainer}>
                  {photo && photoValid ? (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Preview"
                      width="140"
                      height="180"
                    />
                  ) : (
                    <div style={{ fontSize: "12px" }}>Photo</div>
                  )}
                </div>
                <br />
                <input type="file" onChange={handlePhotoChange} />
                <div
                  style={{
                    fontSize: "12px",
                    color: photoValid ? "green" : "red",
                  }}
                >
                  {photoMessage}
                </div>
              </td>
            </tr>

            <tr>
              <td style={labelStyle}>Gender</td>
              <td style={inputCell}>
                <div style={genderContainer}>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={data.gender === "Male"}
                      onChange={handleChange}
                    />{" "}
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={data.gender === "Female"}
                      onChange={handleChange}
                    />{" "}
                    Female
                  </label>
                </div>
                {showError("gender")}
              </td>
            </tr>

            <tr>
              <td style={labelStyle}>Date of Birth</td>
              <td style={inputCell}>
                <input
                  style={inputStyle}
                  type="date"
                  name="dob"
                  value={data.dob || ""}
                  onChange={handleChange}
                />
                {showError("dob")}
              </td>
            </tr>

            <tr>
              <td style={labelStyle}>Age</td>
              <td style={inputCell}>
                <input
                  style={inputStyle}
                  type="number"
                  name="age"
                  value={data.age || ""}
                  onChange={handleChange}
                />
                {showError("age")}
              </td>
            </tr>

            <tr>
              <td style={labelStyle}>Nationality</td>
              <td style={inputCell}>
                <input
                  style={inputStyle}
                  name="nationality"
                  value={data.nationality || ""}
                  onChange={handleChange}
                />
                {showError("nationality")}
              </td>
            </tr>

            <tr>
              <td style={labelStyle}>Marital Status</td>
              <td style={inputCell}>
                <select
                  style={inputStyle}
                  name="maritalStatus"
                  value={data.maritalStatus || ""}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
                {showError("maritalStatus")}
              </td>
            </tr>

            <tr>
              <td style={labelStyle}>ID Number</td>
              <td style={inputCell} colSpan="2">
                <input
                  style={inputStyle}
                  name="idNumber"
                  value={data.idNumber || ""}
                  onChange={handleChange}
                />
                {showError("idNumber")}
              </td>
            </tr>

            <tr>
              <td style={labelStyle}>PAN</td>
              <td style={inputCell} colSpan="2">
                <input
                  style={inputStyle}
                  name="pan"
                  value={data.pan || ""}
                  onChange={handleChange}
                />
                {showError("pan")}
              </td>
            </tr>

            <tr>
              <td style={labelStyle}>Blood Group</td>
              <td style={inputCell} colSpan="2">
                <input
                  style={inputStyle}
                  name="bloodGroup"
                  value={data.bloodGroup || ""}
                  onChange={handleChange}
                  placeholder="e.g., O+, AB-"
                />
                {showError("bloodGroup")}
              </td>
            </tr>

            <tr>
              <td style={labelStyle}>Physically Challenged</td>
              <td style={inputCell} colSpan="2">
                <select
                  style={inputStyle}
                  name="physical"
                  value={data.physical || ""}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {showError("physical")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PersonalInfoValidation;
