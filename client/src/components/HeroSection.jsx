import React, { useState } from "react";
import bgImage from "../assets/backgroundImage.png";
import marvelLogo from "../assets/marvelLogo.svg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <section
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh", // <-- change this
    height: "100vh",    // <-- add this for strictness
    width: "100vw",
    position: "relative",
    display: "flex",
    alignItems: "center",
    color: "#fff",
  }}
>
      {/* Overlay for dark effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginLeft: "5vw",
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <img
          src={marvelLogo}
          alt="Marvel Studios"
          style={{ height: 44, marginBottom: 8 }}
        />
        <h1 style={{ fontSize: "3rem", fontWeight: 700, lineHeight: 1.1 }}>
          Guardians <br /> of the Galaxy
        </h1>
        <div style={{ color: "#ccc", fontSize: "1.1rem", display: "flex", gap: 16 }}>
          <span>Action</span>
          <span>|</span>
          <span>Adventure</span>
          <span>|</span>
          <span>Sci-Fi</span>
        </div>
        <div style={{ display: "flex", gap: 24, color: "#ccc", fontSize: "1.1rem" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {/* <CalendarIcon style={{ width: 18, height: 18 }} /> */}
            <span role="img" aria-label="calendar">📅</span> 2018
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {/* <ClockIcon style={{ width: 18, height: 18 }} /> */}
            <span role="img" aria-label="clock">⏰</span> 2h 8m
          </span>
        </div>
        {/* Explore Movies Button */}
        <button
          onClick={() => navigate('/movies')}
          style={{
            marginTop: '2rem',
            padding: '0.75rem 2rem',
            fontSize: '1.2rem',
            fontWeight: 600,
            color: '#fff',
            background: 'linear-gradient(90deg, #e50914 0%, #b31217 100%)',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #b31217 0%, #e50914 100%)'}
          onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #e50914 0%, #b31217 100%)'}
        >
          Explore Movies
        </button>
      </div>
    </section>
  );
};

export default HeroSection;