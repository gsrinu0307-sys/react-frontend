import React, { useEffect, useState } from "react";

function ContactDetails({ data = {}, setData, submitAttempted = false }) {
  const [errors, setErrors] = useState({});

  // ---------- HANDLE CHANGE ----------
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // ---------- FIELD VALIDATION ----------
  const validateValue = (name, value) => {
    let error = "";

    if (!value?.trim()) {
      error = "This field is required";
    } else {
      if (
        (name === "mobile" ||
          name === "altMobile" ||
          name === "emergency") &&
        !/^\d{10}$/.test(value)
      ) {
        error = "Enter valid 10 digit number";
      }

      if (
        name === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        error = "Enter valid email address";
      }
    }

    return error;
  };

  // ---------- VALIDATE SINGLE FIELD ----------
  const validateField = (name, value) => {
    setErrors((prev) => ({
      ...prev,
      [name]: validateValue(name, value),
    }));
  };

  // ---------- VALIDATE ALL ON SUBMIT ----------
  useEffect(() => {
    if (!submitAttempted) return;

    const fields = [
      "mobile",
      "altMobile",
      "email",
      "emergency",
      "address",
      "permanentAddress",
    ];

    const newErrors = {};
    fields.forEach((field) => {
      const error = validateValue(field, data[field] || "");
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
  }, [submitAttempted, data]);

  const showError = (field) =>
    errors[field] && (
      <small style={{ color: "red", display: "block", fontSize: "12px" }}>
        {errors[field]}
      </small>
    );

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>SECTION B – CONTACT DETAILS</h3>

      <table style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.label}>Mobile Number</td>
            <td style={styles.cell}>
              <input
                name="mobile"
                value={data.mobile || ""}
                onChange={handleChange}
                onBlur={(e) => validateField("mobile", e.target.value)}
                style={styles.input}
              />
              {showError("mobile")}
            </td>
          </tr>

          <tr>
            <td style={styles.label}>Alternate Mobile</td>
            <td style={styles.cell}>
              <input
                name="altMobile"
                value={data.altMobile || ""}
                onChange={handleChange}
                onBlur={(e) => validateField("altMobile", e.target.value)}
                style={styles.input}
              />
              {showError("altMobile")}
            </td>
          </tr>

          <tr>
            <td style={styles.label}>Email</td>
            <td style={styles.cell}>
              <input
                name="email"
                value={data.email || ""}
                onChange={handleChange}
                onBlur={(e) => validateField("email", e.target.value)}
                style={styles.input}
              />
              {showError("email")}
            </td>
          </tr>

          <tr>
            <td style={styles.label}>Emergency Contact</td>
            <td style={styles.cell}>
              <input
                name="emergency"
                value={data.emergency || ""}
                onChange={handleChange}
                onBlur={(e) => validateField("emergency", e.target.value)}
                style={styles.input}
              />
              {showError("emergency")}
            </td>
          </tr>

          <tr>
            <td style={styles.label}>Current Address</td>
            <td style={styles.cell}>
              <textarea
                name="address"
                value={data.address || ""}
                onChange={handleChange}
                onBlur={(e) => validateField("address", e.target.value)}
                style={styles.textarea}
              />
              {showError("address")}
            </td>
          </tr>

          <tr>
            <td style={styles.label}>Permanent Address</td>
            <td style={styles.cell}>
              <textarea
                name="permanentAddress"
                value={data.permanentAddress || ""}
                onChange={handleChange}
                onBlur={(e) =>
                  validateField("permanentAddress", e.target.value)
                }
                style={styles.textarea}
              />
              {showError("permanentAddress")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
  },
  heading: {
    fontSize: "18px",
    textAlign: "center",
    marginBottom: "15px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  label: {
    width: "27%",
    border: "1px solid black",
    backgroundColor: "#f2f2f2",
    padding: "8px",
    fontWeight: "bold",
    verticalAlign: "top",
  },
  cell: {
    border: "1px solid black",
    padding: "8px",
  },
  input: {
    width: "98%",
    border: "none",
    outline: "none",
    fontSize: "13px",
  },
  textarea: {
    width: "98%",
    height: "70px",
    fontSize: "13px",
  },
};

export default ContactDetails;
