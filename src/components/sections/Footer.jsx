export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
      © {currentYear} PathAxiom Pvt. Ltd. | Confidential
    </footer>
  );
}
