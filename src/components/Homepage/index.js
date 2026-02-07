"use client";  

import React, { useState, useEffect } from "react";
import HeroSection from "@/components/Homepage/HeroSection";
import FeatureSection from "@/components/Homepage/FeatureSection";
import StatsSection from "@/components/Homepage/StatsSection";
import SolutionSection from "@/components/Homepage/SolutionSection";

function Homepage() {
  const [showButton, setShowButton] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <SolutionSection />

      {/* Scroll to top button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "50%",
            padding: "10px 15px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}
export default Homepage;

