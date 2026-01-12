import React from "react";
import AnimatedBackground from "./AnimatedBackground"; // Adjust path if needed

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <AnimatedBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
