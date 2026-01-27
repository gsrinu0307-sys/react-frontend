import { useEffect, useState } from "react";

export default function LanguageProficiency({
  data,
  setData,
  submitAttempted,
}) {
  const [errors, setErrors] = useState({});

  // ---------- HANDLE CHANGE ----------
  const handleChange = (language, skill, value) => {
    setData((prev) => ({
      ...prev,
      [language]: {
        ...prev[language],
        [skill]: value,
      },
    }));
  };

  // ---------- VALIDATION ----------
  const validateValue = (value) => {
    if (!value?.trim()) return "Required";
    return "";
  };

  const validateField = (language, skill, value) => {
    setErrors((prev) => ({
      ...prev,
      [`${language}_${skill}`]: validateValue(value),
    }));
  };

  // ---------- VALIDATE ALL ON SUBMIT ----------
  useEffect(() => {
    if (!submitAttempted) return;

    const newErrors = {};
    Object.keys(data).forEach((language) => {
      ["read", "write", "speak"].forEach((skill) => {
        const error = validateValue(data[language][skill]);
        if (error) {
          newErrors[`${language}_${skill}`] = error;
        }
      });
    });

    setErrors(newErrors);
  }, [submitAttempted, data]);

  const showError = (language, skill) =>
    errors[`${language}_${skill}`] && (
      <small style={{ color: "red", display: "block", fontSize: "12px" }}>
        {errors[`${language}_${skill}`]}
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
        SECTION H – LANGUAGE PROFICIENCY
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
            minWidth: "600px",
          }}
        >
          <thead style={{ backgroundColor: "#f2f2f2" }}>
            <tr>
              <th>Language</th>
              <th>Read</th>
              <th>Write</th>
              <th>Speak</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(data).map((language) => (
              <tr key={language}>
                <td style={{ fontWeight: "bold" }}>{language}</td>

                {["read", "write", "speak"].map((skill) => (
                  <td key={skill}>
                    <input
                      type="text"
                      style={ss.input}
                      value={data[language][skill] || ""}
                      onChange={(e) =>
                        handleChange(language, skill, e.target.value)
                      }
                      onBlur={(e) =>
                        validateField(language, skill, e.target.value)
                      }
                    />
                    {showError(language, skill)}
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

const ss = {
  input: {
    width: "98%",
    padding: "6px",
    fontSize: "15px",
    border: "none",
    outline: "none",
  },
};
