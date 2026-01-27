import { useEffect, useState } from "react";

export default function Declaration({ data, setData, submitAttempted }) {
  const [errors, setErrors] = useState({});

  // ---------- HANDLE CHANGE ----------
  const handleChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ---------- VALIDATION ----------
  const validateValue = (value) => {
    if (!value?.trim()) return "Required";
    return "";
  };

  const validateField = (field, value) => {
    setErrors((prev) => ({
      ...prev,
      [field]: validateValue(value),
    }));
  };

  // ---------- VALIDATE ALL ON SUBMIT ----------
  useEffect(() => {
    if (!submitAttempted) return;

    const newErrors = {};
    ["name", "date", "place", "sign"].forEach((field) => {
      const error = validateValue(data[field]);
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
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* ---------- RESPONSIVE STYLES ---------- */}
      <style>
        {`
          @media (max-width: 768px) {
            .declaration-row {
              flex-direction: column;
              gap: 20px;
              width: 100% !important;
            }
            .name-input {
              width: 100% !important;
            }
            .place-input {
              width: 100% !important;
            }
            h3 {
              font-size: 16px;
            }
            p {
              font-size: 14px;
            }
          }
        `}
      </style>

      <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
        DECLARATION
      </h3>

      <p style={{ lineHeight: "1.6" }}>
        I{" "}
        <input
          type="text"
          className="name-input"
          style={{
            border: "none",
            borderBottom: "1px solid black",
            width: "300px",
            outline: "none",
          }}
          value={data.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={(e) => validateField("name", e.target.value)}
        />{" "}
        hereby declare that the information furnished above is true and
        correct to the best of my knowledge. Any misrepresentation may
        lead to withdrawal of offer or termination of employment at{" "}
        <strong>PathAxiom Pvt. Ltd.</strong>
        {showError("name")}
      </p>

      <br />

      <div
        className="declaration-row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <div>
          <strong>Date : </strong>
          <input
            type="date"
            style={{
              border: "none",
              borderBottom: "1px solid black",
              outline: "none",
            }}
            value={data.date || ""}
            onChange={(e) => handleChange("date", e.target.value)}
            onBlur={(e) => validateField("date", e.target.value)}
          />
          {showError("date")}
        </div>

        <div style={{ textAlign: "center" }}>
          <input
            type="text"
            style={{
              border: "none",
              borderBottom: "1px solid black",
              outline: "none",
            }}
            value={data.sign || ""}
            onChange={(e) => handleChange("sign", e.target.value)}
            onBlur={(e) => validateField("sign", e.target.value)}
          />
          <div>Signature</div>
          {showError("sign")}
        </div>
      </div>

      <br />

      <div>
        <strong>Place : </strong>
        <input
          type="text"
          className="place-input"
          style={{
            border: "none",
            borderBottom: "1px solid black",
            width: "200px",
            outline: "none",
          }}
          value={data.place || ""}
          onChange={(e) => handleChange("place", e.target.value)}
          onBlur={(e) => validateField("place", e.target.value)}
        />
        {showError("place")}
      </div>
    </div>
  );
}
