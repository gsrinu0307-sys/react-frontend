import { useEffect, useState } from "react";

export default function ProjectDetails({ data, setData, submitAttempted }) {
  const [errors, setErrors] = useState({});

  // ---------- HANDLE CHANGE ----------
  const handleChange = (index, field, value) => {
    setData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // ---------- ADD NEW ROW ----------
  const addRow = () => {
    setData((prev) => [
      ...prev,
      { title: "", type: "", technologies: "", description: "", role: "" },
    ]);
  };

  // ---------- DELETE ROW ----------
  const deleteRow = (index) => {
    setData((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(prev).forEach((key) => {
        if (key.startsWith(index + "_")) delete newErrors[key];
      });
      return newErrors;
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
    data.forEach((project, index) => {
      ["title", "type", "technologies", "description", "role"].forEach(
        (field) => {
          const error = validateValue(project[field]);
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
      <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
        SECTION F – PROJECT DETAILS
      </h3>

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
              <th>Project Title</th>
              <th>Type</th>
              <th>Technologies Used</th>
              <th>Description</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((project, index) => (
              <tr key={index}>
                <td>
                  <input
                    style={ss.input}
                    value={project.title || ""}
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                    onBlur={(e) =>
                      validateField(index, "title", e.target.value)
                    }
                  />
                  {showError(index, "title")}
                </td>

                <td>
                  <input
                    style={ss.input}
                    value={project.type || ""}
                    onChange={(e) =>
                      handleChange(index, "type", e.target.value)
                    }
                    onBlur={(e) =>
                      validateField(index, "type", e.target.value)
                    }
                  />
                  {showError(index, "type")}
                </td>

                <td>
                  <input
                    style={ss.input}
                    value={project.technologies || ""}
                    onChange={(e) =>
                      handleChange(index, "technologies", e.target.value)
                    }
                    onBlur={(e) =>
                      validateField(index, "technologies", e.target.value)
                    }
                  />
                  {showError(index, "technologies")}
                </td>

                <td>
                  <textarea
                    rows="2"
                    style={ss.textarea}
                    value={project.description || ""}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    onBlur={(e) =>
                      validateField(index, "description", e.target.value)
                    }
                  />
                  {showError(index, "description")}
                </td>

                <td>
                  <input
                    style={ss.input}
                    value={project.role || ""}
                    onChange={(e) =>
                      handleChange(index, "role", e.target.value)
                    }
                    onBlur={(e) =>
                      validateField(index, "role", e.target.value)
                    }
                  />
                  {showError(index, "role")}
                </td>

                <td style={{ textAlign: "center" }}>
                  <button
                    type="button"
                    style={ss.actionBtn}
                    onClick={() => addRow()}
                  >
                    +
                  </button>
                  {data.length > 1 && (
                    <button
                      type="button"
                      style={{ ...ss.actionBtn, marginLeft: "5px" }}
                      onClick={() => deleteRow(index)}
                    >
                      -
                    </button>
                  )}
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
  textarea: {
    width: "100%",
    padding: "6px",
    fontSize: "15px",
    border: "none",
    outline: "none",
    resize: "none",
  },
  actionBtn: {
    padding: "4px 8px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #000000",
    backgroundColor: "transparent",
    color: "#000000",
    cursor: "pointer",
  },
};
