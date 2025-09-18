import React from "react";

export const Footer = () => (
  <footer style={styles.footer}>
    <p style={styles.footerText}>© 2025 StorySphere. All rights reserved.</p>
  </footer>
);

const styles = {
  footer: {
    height: "50px",
    backgroundColor: "#1a237e",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  footerText: {
    fontSize: "18px",
  },
};
