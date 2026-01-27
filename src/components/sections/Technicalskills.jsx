import { useEffect, useState } from "react";

export default function TechnicalSkills({ data, setData, submitAttempted }) {
  const [errors, setErrors] = useState({});

  const categories = [
    "programming",
    "frameworks",
    "databases",
    "cloud",
    "os",
    "other",
  ];

  const handleChange = (category, field, value) => {
    setData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const validateValue = (value) => {
    if (!value?.trim()) return "Required";
    return "";
  };

  const validateField = (category, field, value) => {
    setErrors((prev) => ({
      ...prev,
      [`${category}_${field}`]: validateValue(value),
    }));
  };

  useEffect(() => {
    if (!submitAttempted) return;

    const newErrors = {};
    categories.forEach((category) => {
      ["technologies", "level"].forEach((field) => {
        const value = data?.[category]?.[field] || "";
        const error = validateValue(value);
        if (error) newErrors[`${category}_${field}`] = error;
      });
    });

    setErrors(newErrors);
  }, [submitAttempted, data]);

  const showError = (category, field) =>
    errors[`${category}_${field}`] && (
      <small style={{ color: "red", display: "block", fontSize: "12px" }}>
        {errors[`${category}_${field}`]}
      </small>
    );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* ---------- RESPONSIVE CSS ---------- */}
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
        SECTION E – TECHNICAL SKILLS
      </h3>

      {/* ---------- SCROLL WRAPPER ---------- */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "700px",
          }}
          border="1"
          cellPadding="8"
          cellSpacing="0"
        >
          <thead style={{ backgroundColor: "#f2f2f2" }}>
            <tr>
              <th>Skill Category</th>
              <th>Skills / Technologies</th>
              <th>Proficiency Level</th>
              <th>Remarks</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category}>
                <td style={{ textTransform: "capitalize", fontWeight: "bold" }}>
                  {category === "os"
                    ? "Operating Systems"
                    : category === "cloud"
                    ? "Cloud / DevOps"
                    : category}
                </td>

                <td>
                  <input
                    style={ss.input}
                    value={data?.[category]?.technologies || ""}
                    onChange={(e) =>
                      handleChange(category, "technologies", e.target.value)
                    }
                    onBlur={(e) =>
                      validateField(
                        category,
                        "technologies",
                        e.target.value
                      )
                    }
                  />
                  {showError(category, "technologies")}
                </td>

                <td>
                  <input
                    style={ss.input}
                    value={data?.[category]?.level || ""}
                    onChange={(e) =>
                      handleChange(category, "level", e.target.value)
                    }
                    onBlur={(e) =>
                      validateField(category, "level", e.target.value)
                    }
                  />
                  {showError(category, "level")}
                </td>

                <td>
                  <input
                    style={ss.input}
                    value={data?.[category]?.remarks || ""}
                    onChange={(e) =>
                      handleChange(category, "remarks", e.target.value)
                    }
                  />
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
