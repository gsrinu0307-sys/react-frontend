import { useState } from "react";

function ApplicationForm() {
  const [applicationId, setApplicationId] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ----------------- UNIVERSAL CHANGE HANDLER -----------------
  const handleChange = (pathOrKey, valueOrKey, valueIfAny) => {
    if (Array.isArray(pathOrKey)) {
      const path = pathOrKey;
      const value = valueOrKey;
      setData((prev) => {
        const updated = { ...prev };
        let current = updated;
        for (let i = 0; i < path.length - 1; i++) {
          if (!current[path[i]]) current[path[i]] = {};
          current[path[i]] = { ...current[path[i]] };
          current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        return updated;
      });
    } else {
      const key = pathOrKey;
      const value = valueIfAny === undefined ? valueOrKey : valueIfAny;
      setData((prev) => ({ ...prev, [key]: value }));
    }
  };

  // ----------------- SEARCH -----------------
  const handleSearch = async () => {
    if (!applicationId) return alert("Enter Application ID");
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`http://localhost:5000/api/application/${applicationId}`);
      const result = await res.json();
      if (!result.success) {
        setMessage(result.message);
      } else {
        setData(result.application.application_data || {});
        setMessage("");
      }
    } catch (err) {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ----------------- UPDATE -----------------
  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/application/${applicationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      alert(result.message);
    } catch (err) {
      alert("Update failed");
    }
  };

  // ----------------- DELETE -----------------
  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/application/${applicationId}`, {
        method: "DELETE",
      });
      const result = await res.json();
      alert(result.message);
      if (result.success) setData({});
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search & Edit Application</h2>

      <input
        type="text"
        placeholder="Application ID"
        value={applicationId}
        onChange={(e) => setApplicationId(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />
      <button onClick={handleSearch} disabled={loading} style={{ marginLeft: "10px" }}>
        {loading ? "Searching..." : "Search"}
      </button>
      {message && <p style={{ color: "red" }}>{message}</p>}

      {data && Object.keys(data).length > 0 && (
        <div style={{ marginTop: "20px" }}>
          {/* ----------------- PERSONAL INFO ----------------- */}
          <h3>Personal Info</h3>
          <input
            placeholder="Full Name"
            value={data.personal?.fullName || ""}
            onChange={(e) => handleChange(["personal", "fullName"], e.target.value)}
          />
          <input
            placeholder="Gender"
            value={data.personal?.gender || ""}
            onChange={(e) => handleChange(["personal", "gender"], e.target.value)}
          />
          <input
            type="date"
            placeholder="DOB"
            value={data.personal?.dob || ""}
            onChange={(e) => handleChange(["personal", "dob"], e.target.value)}
          />
          <input
            placeholder="PAN"
            value={data.personal?.pan || ""}
            onChange={(e) => handleChange(["personal", "pan"], e.target.value)}
          />

          {/* ----------------- CONTACT ----------------- */}
          <h3>Contact Info</h3>
          <input
            placeholder="Mobile"
            value={data.contact?.mobile || ""}
            onChange={(e) => handleChange(["contact", "mobile"], e.target.value)}
          />
          <input
            placeholder="Email"
            value={data.contact?.email || ""}
            onChange={(e) => handleChange(["contact", "email"], e.target.value)}
          />
          <textarea
            placeholder="Address"
            value={data.contact?.address || ""}
            onChange={(e) => handleChange(["contact", "address"], e.target.value)}
          />

          {/* ----------------- FAMILY ----------------- */}
          <h3>Family Details</h3>
          {["father", "mother", "guardian"].map((member) => (
            <div key={member}>
              <h4>{member.toUpperCase()}</h4>
              <input
                placeholder="Name"
                value={data.family?.[member]?.name || ""}
                onChange={(e) => handleChange(["family", member, "name"], e.target.value)}
              />
              <input
                placeholder="Occupation"
                value={data.family?.[member]?.occupation || ""}
                onChange={(e) => handleChange(["family", member, "occupation"], e.target.value)}
              />
              <input
                placeholder="Contact"
                value={data.family?.[member]?.contact || ""}
                onChange={(e) => handleChange(["family", member, "contact"], e.target.value)}
              />
            </div>
          ))}

          {/* ----------------- EDUCATION ----------------- */}
          <h3>Education</h3>
          {["ssc", "inter", "graduation", "postGraduation"].map((level) => (
            <div key={level}>
              <h4>{level.toUpperCase()}</h4>
              <input
                placeholder="College / School"
                value={data.education?.[level]?.college || ""}
                onChange={(e) => handleChange(["education", level, "college"], e.target.value)}
              />
              <input
                placeholder="Percentage"
                value={data.education?.[level]?.percentage || ""}
                onChange={(e) => handleChange(["education", level, "percentage"], e.target.value)}
              />
            </div>
          ))}

          {/* ----------------- TECHNICAL SKILLS ----------------- */}
          <h3>Technical Skills</h3>
          {["programming", "frameworks", "databases", "cloud", "os", "other"].map((cat) => (
            <div key={cat}>
              <h4>{cat.toUpperCase()}</h4>
              <input
                placeholder="Technologies"
                value={data.technicalSkills?.[cat]?.technologies || ""}
                onChange={(e) => handleChange(["technicalSkills", cat, "technologies"], e.target.value)}
              />
              <input
                placeholder="Level"
                value={data.technicalSkills?.[cat]?.level || ""}
                onChange={(e) => handleChange(["technicalSkills", cat, "level"], e.target.value)}
              />
              <input
                placeholder="Remarks"
                value={data.technicalSkills?.[cat]?.remarks || ""}
                onChange={(e) => handleChange(["technicalSkills", cat, "remarks"], e.target.value)}
              />
            </div>
          ))}

          {/* ----------------- INTERNSHIPS / TRAINING ----------------- */}
          <h3>Internship / Training</h3>
          {(data.internships || []).map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <h4>Internship {index + 1}</h4>
              <input
                placeholder="Organization"
                value={item.organization || ""}
                onChange={(e) => handleChange(["internships", index, "organization"], e.target.value)}
              />
              <input
                placeholder="Duration"
                value={item.duration || ""}
                onChange={(e) => handleChange(["internships", index, "duration"], e.target.value)}
              />
              <input
                placeholder="Domain / Technology"
                value={item.domain || ""}
                onChange={(e) => handleChange(["internships", index, "domain"], e.target.value)}
              />
              <input
                placeholder="Certificate Submitted"
                value={item.certificate || ""}
                onChange={(e) => handleChange(["internships", index, "certificate"], e.target.value)}
              />
            </div>
          ))}

          {/* ----------------- LANGUAGE PROFICIENCY ----------------- */}
          <h3>Language Proficiency</h3>
          {Object.keys(data.languages || {}).map((language) => (
            <div key={language} style={{ marginBottom: "10px" }}>
              <h4>{language.toUpperCase()}</h4>
              <input
                placeholder="Read"
                value={data.languages[language].read || ""}
                onChange={(e) => handleChange(["languages", language, "read"], e.target.value)}
              />
              <input
                placeholder="Write"
                value={data.languages[language].write || ""}
                onChange={(e) => handleChange(["languages", language, "write"], e.target.value)}
              />
              <input
                placeholder="Speak"
                value={data.languages[language].speak || ""}
                onChange={(e) => handleChange(["languages", language, "speak"], e.target.value)}
              />
            </div>
          ))}


          {/* ----------------- DECLARATION ----------------- */}
          <h3>Declaration</h3>
          <input
            placeholder="Name"
            value={data.declaration?.name || ""}
            onChange={(e) => handleChange(["declaration", "name"], e.target.value)}
          />
          <input
            placeholder="Date"
            type="date"
            value={data.declaration?.date || ""}
            onChange={(e) => handleChange(["declaration", "date"], e.target.value)}
          />
          <input
            placeholder="Place"
            value={data.declaration?.place || ""}
            onChange={(e) => handleChange(["declaration", "place"], e.target.value)}
          />
          <input
            placeholder="Signature"
            value={data.declaration?.sign || ""}
            onChange={(e) => handleChange(["declaration", "sign"], e.target.value)}
          />

          <div style={{ marginTop: "20px" }}>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete} style={{ marginLeft: "10px", background: "red", color: "#fff" }}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationForm;
