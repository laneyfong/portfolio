import type { FC } from "react";
import { tokens } from "./tokens";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { LinkedInIcon, EmailIcon, XIcon, SocialIconLink, LINKEDIN_URL, X_URL, CONTACT_EMAIL } from "./components/SocialIcons";
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

interface CommunitiesEntry {
  role: string;
  organization: string;
}

const AboutPage: FC = () => {
  const { ref: profileRef } = useScrollReveal({ threshold: 0.5 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({ threshold: 0.3 });

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

  const communities: CommunitiesEntry[] = [
    { role: "Internal President", organization: "UX@Berkeley" },
    { role: "Campus Ambassador", organization: "Partiful" },
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
        @media (max-width: 768px) {
          .about-main-container {
            flex-direction: column !important;
            gap: 40px !important;
            padding-top: 0 !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
            min-height: auto !important;
          }

          .about-svg-bg {
            display: none !important;
          }

          .about-profile-card {
            width: 100% !important;
            height: auto !important;
            margin-bottom: 0 !important;
            justify-content: flex-start !important;
          }

          .about-content-panel {
            width: 100% !important;
            max-width: none !important;
          }
        }

        @media (max-width: 640px) {
          .about-main-container {
            padding-left: 12px !important;
            padding-right: 12px !important;
            gap: 32px !important;
          }

          .about-profile-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            height: auto !important;
            gap: 12px !important;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .about-profile-reveal {
          animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .about-content-reveal {
          opacity: 0;
          animation: ${contentVisible ? "fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none"};
        }

        @keyframes blobFlow {
          0% {
            filter: blur(0px) brightness(1);
          }
          25% {
            filter: blur(0.5px) brightness(1.05);
          }
          50% {
            filter: blur(1px) brightness(1);
          }
          75% {
            filter: blur(0.5px) brightness(1.05);
          }
          100% {
            filter: blur(0px) brightness(1);
          }
        }

        @keyframes shiftContent {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>

      <main
        style={{
          width: "100%",
          padding: "0 0 200px 0",
          boxSizing: "border-box",
          marginTop: "65px",
          position: "relative",
          minHeight: "calc(100vh - 65px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Main content container */}
        <div
          className="about-main-container"
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
            className="about-svg-bg"
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
              animation: "blobFlow 6s ease-in-out infinite",
              transformOrigin: "center center",
            }}
          />


          {/* Profile Card - Left Side */}
          <div
            ref={profileRef}
            className="about-profile-reveal about-profile-card"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
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
                  color: "#333333",
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
                  margin: "0 0 12px 0",
                  padding: "0",
                }}
              >
                I am an artist, foodie,<br />
                dog-lover, and traveler.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <SocialIconLink href={LINKEDIN_URL} label="LinkedIn" external variant="light">
                  <LinkedInIcon />
                </SocialIconLink>
                <SocialIconLink href={X_URL} label="X" external variant="light">
                  <XIcon />
                </SocialIconLink>
                <SocialIconLink href={`mailto:${CONTACT_EMAIL}`} label="Email" variant="light">
                  <EmailIcon />
                </SocialIconLink>
              </div>
            </div>
          </div>

          {/* Right Panel - Content */}
          <div
            ref={contentRef}
            className={`about-content-panel ${contentVisible ? "about-content-reveal" : ""}`}
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
              opacity: contentVisible ? 1 : 0,
              animation: contentVisible ? "fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none",
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
                  height: "0",
                  borderTop: "1px solid #DCDCDC",
                  borderBottom: "none",
                  borderLeft: "none",
                  borderRight: "none",
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
                        color: "#333333",
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
                        color: "#333333",
                      }}
                    >
                      {exp.company}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Manrope'",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "19px",
                      letterSpacing: "-0.05em",
                      color: "#929292",
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
                  height: "0",
                  borderTop: "1px solid #DCDCDC",
                  borderBottom: "none",
                  borderLeft: "none",
                  borderRight: "none",
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
                      color: "#333333",
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

            {/* Communities Section */}
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
                  Communities
                </h4>
              </div>

              {/* Communities entries */}
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
                {communities.map((comm, index) => (
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
                          color: "#333333",
                        }}
                      >
                        {comm.role}
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
                          color: "#333333",
                        }}
                      >
                        {comm.organization}
                      </span>
                    </div>
                  </div>
                ))}
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
                          color: "#333333",
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
