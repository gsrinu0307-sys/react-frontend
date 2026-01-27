import { useEffect, useState } from "react";

export default function FamilyDetails({ data = {}, setData, submitAttempted }) {
  const [errors, setErrors] = useState({});

  // ---------- HANDLE CHANGE ----------
  const handleChange = (member, field, value) => {
    setData((prev) => ({
      ...prev,
      [member]: {
        ...prev[member],
        [field]: value,
      },
    }));
  };

  // ---------- FIELD VALIDATION ----------
  const validateValue = (field, value) => {
    let error = "";

    if (!value?.trim()) {
      error = "Required";
    } else if (field === "contact" && !/^\d{10}$/.test(value)) {
      error = "Enter valid 10 digit number";
    }

    return error;
  };

  // ---------- VALIDATE SINGLE FIELD ----------
  const validateField = (member, field, value) => {
    setErrors((prev) => ({
      ...prev,
      [`${member}_${field}`]: validateValue(field, value),
    }));
  };

  // ---------- VALIDATE ALL ON SUBMIT ----------
  useEffect(() => {
    if (!submitAttempted) return;

    const members = ["father", "mother"];
    const fields = ["name", "occupation", "contact"];
    const newErrors = {};

    members.forEach((member) => {
      fields.forEach((field) => {
        const value = data?.[member]?.[field] || "";
        const error = validateValue(field, value);
        if (error) {
          newErrors[`${member}_${field}`] = error;
        }
      });
    });

    setErrors(newErrors);
  }, [submitAttempted, data]);

  const showError = (member, field) =>
    errors[`${member}_${field}`] && (
      <small style={{ color: "red", display: "block", fontSize: "12px" }}>
        {errors[`${member}_${field}`]}
      </small>
    );

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>SECTION C – FAMILY DETAILS</h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Relationship</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Occupation</th>
            <th style={styles.th}>Contact Number</th>
          </tr>
        </thead>

        <tbody>
          {/* Father */}
          <tr>
            <td style={styles.td}>Father</td>
            <td style={styles.td}>
              <input
                style={styles.input}
                value={data.father?.name || ""}
                onChange={(e) =>
                  handleChange("father", "name", e.target.value)
                }
                onBlur={(e) =>
                  validateField("father", "name", e.target.value)
                }
              />
              {showError("father", "name")}
            </td>
            <td style={styles.td}>
              <input
                style={styles.input}
                value={data.father?.occupation || ""}
                onChange={(e) =>
                  handleChange("father", "occupation", e.target.value)
                }
                onBlur={(e) =>
                  validateField("father", "occupation", e.target.value)
                }
              />
              {showError("father", "occupation")}
            </td>
            <td style={styles.td}>
              <input
                style={styles.input}
                value={data.father?.contact || ""}
                onChange={(e) =>
                  handleChange("father", "contact", e.target.value)
                }
                onBlur={(e) =>
                  validateField("father", "contact", e.target.value)
                }
              />
              {showError("father", "contact")}
            </td>
          </tr>

          {/* Mother */}
          <tr>
            <td style={styles.td}>Mother</td>
            <td style={styles.td}>
              <input
                style={styles.input}
                value={data.mother?.name || ""}
                onChange={(e) =>
                  handleChange("mother", "name", e.target.value)
                }
                onBlur={(e) =>
                  validateField("mother", "name", e.target.value)
                }
              />
              {showError("mother", "name")}
            </td>
            <td style={styles.td}>
              <input
                style={styles.input}
                value={data.mother?.occupation || ""}
                onChange={(e) =>
                  handleChange("mother", "occupation", e.target.value)
                }
                onBlur={(e) =>
                  validateField("mother", "occupation", e.target.value)
                }
              />
              {showError("mother", "occupation")}
            </td>
            <td style={styles.td}>
              <input
                style={styles.input}
                value={data.mother?.contact || ""}
                onChange={(e) =>
                  handleChange("mother", "contact", e.target.value)
                }
                onBlur={(e) =>
                  validateField("mother", "contact", e.target.value)
                }
              />
              {showError("mother", "contact")}
            </td>
          </tr>

          {/* Guardian */}
          <tr>
            <td style={styles.td}>Guardian (If Any)</td>
            <td style={styles.td}>
              <input
                style={styles.input}
                value={data.guardian?.name || ""}
                onChange={(e) =>
                  handleChange("guardian", "name", e.target.value)
                }
              />
            </td>
            <td style={styles.td}>
              <input
                style={styles.input}
                value={data.guardian?.occupation || ""}
                onChange={(e) =>
                  handleChange("guardian", "occupation", e.target.value)
                }
              />
            </td>
            <td style={styles.td}>
              <input
                style={styles.input}
                value={data.guardian?.contact || ""}
                onChange={(e) =>
                  handleChange("guardian", "contact", e.target.value)
                }
                onBlur={(e) =>
                  validateField("guardian", "contact", e.target.value)
                }
              />
              {showError("guardian", "contact")}
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
    textAlign: "center",
    fontSize: "18px",
    marginBottom: "15px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid black",
    padding: "8px",
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
  },
  td: {
    border: "1px solid black",
    padding: "6px",
  },
  input: {
    width: "98%",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },
};
