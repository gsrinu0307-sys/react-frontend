import { useEffect, useState } from "react";

export default function InternshipDetails({ data, setData, submitAttempted }) {
  const [errors, setErrors] = useState({});

  // ---------- HANDLE CHANGE ----------
  const handleChange = (index, field, value) => {
    setData((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  // ---------- FIELD VALIDATION ----------
  const validateValue = (value) => {
    if (!value?.trim()) return "Required";
    return "";
  };

  const validateField = (index, field, value) => {
    setErrors((prev) => ({
      ...prev,
      [`${index}_${field}`]: validateValue(value),
    }));
  };

  // ---------- VALIDATE ALL ON SUBMIT ----------
  useEffect(() => {
    if (!submitAttempted) return;

    const newErrors = {};
    data.forEach((item, index) => {
      ["organization", "duration", "domain", "certificate"].forEach(
        (field) => {
          const error = validateValue(item[field]);
          if (error) newErrors[`${index}_${field}`] = error;
        }
      );
    });

    setErrors(newErrors);
  }, [submitAttempted, data]);

  const showError = (index, field) =>
    errors[`${index}_${field}`] && (
      <small style={{ color: "red", display: "block", fontSize: "12px" }}>
        {errors[`${index}_${field}`]}
      </small>
    );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* ---------- RESPONSIVE STYLES ---------- */}
      <style>
        {`
          @media (max-width: 768px) {
            table {
              font-size: 13px;
            }
            input {
              font-size: 13px;
            }
            h3 {
              font-size: 16px;
            }
          }
        `}
      </style>

      <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
        SECTION G – INTERNSHIP / TRAINING DETAILS
      </h3>

      {/* ---------- SCROLL FOR SMALL SCREENS ---------- */}
      <div style={{ overflowX: "auto" }}>
        <table
          border="1"
          cellPadding="8"
          cellSpacing="0"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "750px",
          }}
        >
          <thead style={{ backgroundColor: "#f2f2f2" }}>
            <tr>
              <th>Organization</th>
              <th>Duration</th>
              <th>Domain / Technology</th>
              <th>Certificate Submitted</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    style={ss.input}
                    value={item.organization || ""}
                    onChange={(e) =>
                      handleChange(index, "organization", e.target.value)
                    }
                    onBlur={(e) =>
                      validateField(index, "organization", e.target.value)
                    }
                  />
                  {showError(index, "organization")}
                </td>

                <td>
                  <input
                    style={ss.input}
                    value={item.duration || ""}
                    onChange={(e) =>
                      handleChange(index, "duration", e.target.value)
                    }
                    onBlur={(e) =>
                      validateField(index, "duration", e.target.value)
                    }
                  />
                  {showError(index, "duration")}
                </td>

                <td>
                  <input
                    style={ss.input}
                    value={item.domain || ""}
                    onChange={(e) =>
                      handleChange(index, "domain", e.target.value)
                    }
                    onBlur={(e) =>
                      validateField(index, "domain", e.target.value)
                    }
                  />
                  {showError(index, "domain")}
                </td>

                <td>
                  <input
                    style={ss.input}
                    value={item.certificate || ""}
                    onChange={(e) =>
                      handleChange(index, "certificate", e.target.value)
                    }
                    onBlur={(e) =>
                      validateField(index, "certificate", e.target.value)
                    }
                  />
                  {showError(index, "certificate")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const ss = {
  input: {
    width: "98%",
    padding: "6px",
    fontSize: "15px",
    border: "none",
    outline: "none",
  },
};
