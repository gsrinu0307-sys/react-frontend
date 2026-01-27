import { useEffect, useState } from "react";

export default function EducationForm({ data, setData, submitAttempted }) {
  const [errors, setErrors] = useState({});

  const levels = ["ssc", "inter", "graduation", "postGraduation"];
  const fields = ["institution", "board", "specialization", "year", "percentage"];

  const validateField = (field, value) => {
    let error = "";

    if (!value?.trim()) error = "Required";

    if (field === "year" && value && !/^\d{4}$/.test(value))
      error = "Enter valid year";

    if (
      field === "percentage" &&
      value &&
      (isNaN(value) || value < 0 || value > 100)
    )
      error = "Enter valid %";

    return error;
  };

  // ✅ Handle change + live error removal
  const handleChange = (level, field, value) => {
    setData((prev) => ({
      ...prev,
      [level]: {
        ...prev[level],
        [field]: value,
      },
    }));

    // 🔥 LIVE VALIDATION
    const error = validateField(field, value);

    setErrors((prev) => {
      const updated = { ...prev };
      const key = `${level}_${field}`;

      if (!error) {
        delete updated[key]; // ✅ remove error
      } else {
        updated[key] = error; // ❌ keep error
      }

      return updated;
    });
  };

  // ---------- VALIDATE ALL ON SUBMIT ----------
  useEffect(() => {
    if (!submitAttempted) return;

    const newErrors = {};
    levels.forEach((level) => {
      fields.forEach((field) => {
        const value = data[level]?.[field] || "";
        const error = validateField(field, value);
        if (error) newErrors[`${level}_${field}`] = error;
      });
    });

    setErrors(newErrors);
  }, [submitAttempted, data]);

  const showError = (level, field) =>
    errors[`${level}_${field}`] && (
      <small style={{ color: "red", display: "block", fontSize: "12px" }}>
        {errors[`${level}_${field}`]}
      </small>
    );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
  <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
    SECTION D – EDUCATIONAL QUALIFICATIONS
  </h3>

  {/* 👇 ADD THIS WRAPPER */}
  <div style={{ overflowX: "auto", width: "100%" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
      <thead>
        <tr>
          <th style={styles.th}>Qualification</th>
          <th style={styles.th}>Institution / College</th>
          <th style={styles.th}>Board / University</th>
          <th style={styles.th}>Specialization</th>
          <th style={styles.th}>Year of Passing</th>
          <th style={styles.th}>Percentage (%)</th>
        </tr>
      </thead>

      <tbody>
        {levels.map((level) => (
          <tr key={level}>
            <td style={styles.td}>{level.toUpperCase()}</td>

            {fields.map((field) => (
              <td style={styles.td} key={field}>
                <input
                  style={styles.input}
                  value={data[level]?.[field] || ""}
                  onChange={(e) =>
                    handleChange(level, field, e.target.value)
                  }
                />
                {showError(level, field)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    </div>

  );
}

const styles = {
  th: {
    border: "1px solid black",
    padding: "8px",
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
    fontSize: "14px",
  },
  td: {
    border: "1px solid black",
    padding: "6px",
  },
  input: {
    width: "98%",
    padding: "6px",
    fontSize: "14px",
    border: "none",
    outline: "none",
  },
};
