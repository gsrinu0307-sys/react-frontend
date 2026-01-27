import { useLocation, useNavigate } from "react-router-dom";
import "./success.css";

function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const applicationId = location.state?.applicationId;

  // ❌ Prevent direct URL access
  if (!applicationId) {
    return (
      <div className="success-container">
        <h2>Invalid Access</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="success-container">
      <div className="success-card">
        <h1>✅ Application Submitted Successfully</h1>

        <p>Your Application ID</p>
        <h2 className="app-id">{applicationId}</h2>

        <p className="note">
          Please save this Application ID for future reference.
        </p>

        <button onClick={() => navigate("/")}>
          Submit Another Application
        </button>
      </div>
    </div>
  );
}

export default SuccessPage;
