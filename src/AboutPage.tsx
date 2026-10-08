import type { FC } from "react";
import { tokens } from "./tokens";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import kinoSvg from "./assets/kino-visual.svg";

interface ExperienceEntry {
  role: string;
  company: string;
  year: string;
}

interface EducationEntry {
  degree: string;
  school: string;
  year: string;
}

const AboutPage: FC = () => {
  const experiences: ExperienceEntry[] = [
    { role: "Product Designer (Capstone)", company: "Nvidia", year: "2026" },
    { role: "Product Growth & Design Intern", company: "Sensitel", year: "2026" },
    { role: "Product Designer (Contract)", company: "MyShake", year: "2024, 2025" },
    { role: "Product Design Intern", company: "Eximlabs", year: "2023" },
    { role: "UI Designer (Contract)", company: "Mind Coffee", year: "2023" },
    { role: "UX Design Intern", company: "Advanced Health Academy", year: "2022" },
  ];

  const education: EducationEntry[] = [
    { degree: "M.S. Human Computer Interaction", school: "University of California, Santa Cruz", year: "2026" },
    { degree: "B.A. Cognitive Science", school: "University of California, Berkeley", year: "2024" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: tokens.color.white,
        fontFamily: tokens.font.sans,
        color: tokens.color.body,
        position: "relative",
      }}
    >
      <TopNav />

      <style>{`
        @keyframes subtleRotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(1.5deg) scale(1.01);
          }
          100% {
            transform: rotate(0deg) scale(1);
          }
        }
      `}</style>

      <main
        style={{
          width: "100%",
          padding: "0 0 100px 0",
          boxSizing: "border-box",
          marginTop: "0",
          position: "relative",
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Main content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "0",
            gap: "95px",
            position: "relative",
            width: "100%",
            height: "auto",
            minHeight: "943px",
            paddingTop: "143px",
            paddingLeft: "52px",
            paddingRight: "52px",
            boxSizing: "border-box",
          }}
        >
          {/* Left Panel - SVG Background */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "400px",
              height: "100%",
              overflow: "visible",
              zIndex: 0,
              backgroundImage: `url(${kinoSvg})`,
              backgroundSize: "contain",
              backgroundPosition: "center left",
              backgroundRepeat: "no-repeat",
              pointerEvents: "none",
              animation: "subtleRotate 8s ease-in-out infinite",
              transformOrigin: "center center",
            }}
          />


          {/* Profile Card - Left Side */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              padding: "0",
              gap: "18px",
              width: "328px",
              height: "83px",
              position: "relative",
              zIndex: 10,
              marginBottom: "auto",
            }}
          >
            {/* Profile Image */}
            <img
              src="/IMG_0338.PNG"
              alt="Laney Fong"
              style={{
                width: "86px",
                height: "83px",
                borderRadius: "100px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />

            {/* Name and Subtitle */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0",
                gap: "6px",
                width: "224px",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Manrope'",
                  fontWeight: 500,
                  fontSize: "24px",
                  lineHeight: "33px",
                  letterSpacing: "-0.05em",
                  color: "#111111",
                  margin: "0",
                  padding: "0",
                }}
              >
                Laney Fong
              </h2>
              <p
                style={{
                  fontFamily: "'Manrope'",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "22px",
                  letterSpacing: "-0.05em",
                  color: "#8B8B8B",
                  margin: "0",
                  padding: "0",
                }}
              >
                I am an artist, foodie,<br />
                dog-lover, and traveler.
              </p>
            </div>
          </div>

          {/* Right Panel - Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0",
              gap: "29px",
              width: "550px",
              maxWidth: "100%",
              position: "relative",
              zIndex: 5,
            }}
          >
            {/* Hello section */}
            <h3
              style={{
                fontFamily: "'Manrope'",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "22px",
                letterSpacing: "-0.05em",
                color: "#111111",
                margin: "0",
                padding: "0",
              }}
            >
              Hello!
            </h3>

            {/* Bio text */}
            <p
              style={{
                fontFamily: "'Manrope'",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "22px",
                letterSpacing: "-0.05em",
                color: "#111111",
                margin: "0",
                padding: "0",
                marginTop: "-13px",
              }}
            >
              Raised by a designer and an engineer in the Bay Area, I grew up at the intersection of art and technology. Seeing those two worlds blend early on, I always knew design was my calling. That early passion, combined with a deep curiosity about human behavior, led me to product design. I design products that work for everyone. My approach: research-backed decisions, obsessive attention to accessibility, and ruthless focus on reducing friction. Every pixel serves a purpose.
            </p>

            {/* Experience Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0",
                gap: "16px",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "0px",
                  border: "1px solid #DCDCDC",
                }}
              />
              <h4
                style={{
                  fontFamily: "'Manrope'",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "22px",
                  letterSpacing: "-0.05em",
                  color: "#868585",
                  margin: "0",
                  padding: "0",
                }}
              >
                Experience
              </h4>
            </div>

            {/* Experience entries */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0",
                gap: "16px",
                width: "100%",
              }}
            >
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0",
                    gap: "24px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "0",
                      gap: "12px",
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Manrope'",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "22px",
                        letterSpacing: "-0.05em",
                        color: "#111111",
                      }}
                    >
                      {exp.role}
                    </span>
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        background: "#D9D9D9",
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Manrope'",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "22px",
                        letterSpacing: "-0.05em",
                        color: "#111111",
                      }}
                    >
                      {exp.company}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Manrope'",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "22px",
                      letterSpacing: "-0.05em",
                      color: "#000000",
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {exp.year}
                  </span>
                </div>
              ))}
            </div>

            {/* Award Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0",
                gap: "16px",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "0px",
                  border: "1px solid #DCDCDC",
                }}
              />
              <h4
                style={{
                  fontFamily: "'Manrope'",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "22px",
                  letterSpacing: "-0.05em",
                  color: "#868585",
                  margin: "0",
                  padding: "0",
                }}
              >
                Award
              </h4>
            </div>

            {/* Award entry */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0",
                gap: "16px",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0",
                  gap: "8px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    padding: "0",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Manrope'",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "22px",
                      letterSpacing: "-0.05em",
                      color: "#111111",
                    }}
                  >
                    First-Place
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0",
                    gap: "16px",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Manrope'",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "19px",
                      letterSpacing: "-0.05em",
                      color: "rgba(146, 146, 146, 0.933333)",
                    }}
                  >
                    Google Designathon
                  </span>
                  <span
                    style={{
                      fontFamily: "'Manrope'",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "19px",
                      letterSpacing: "-0.05em",
                      color: "#929292",
                      flexShrink: 0,
                    }}
                  >
                    2025
                  </span>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0",
                gap: "29px",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0",
                  gap: "16px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "0px",
                    border: "1px solid #DCDCDC",
                  }}
                />
                <h4
                  style={{
                    fontFamily: "'Manrope'",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "22px",
                    letterSpacing: "-0.05em",
                    color: "#868585",
                    margin: "0",
                    padding: "0",
                  }}
                >
                  Education
                </h4>
              </div>

              {/* Education entries */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0",
                  gap: "16px",
                  width: "100%",
                }}
              >
                {education.map((edu, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: "0",
                      gap: "8px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: "0",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Manrope'",
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "22px",
                          letterSpacing: "-0.05em",
                          color: "#111111",
                        }}
                      >
                        {edu.degree}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0",
                        gap: "16px",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Manrope'",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "19px",
                          letterSpacing: "-0.05em",
                          color: "rgba(146, 146, 146, 0.933333)",
                        }}
                      >
                        {edu.school}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Manrope'",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "19px",
                          letterSpacing: "-0.05em",
                          color: "#929292",
                          flexShrink: 0,
                        }}
                      >
                        {edu.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
