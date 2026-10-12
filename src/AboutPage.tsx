import type { FC } from "react";
import { tokens } from "./tokens";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { LinkedInIcon, EmailIcon, XIcon, SocialIconLink, LINKEDIN_URL, X_URL, CONTACT_EMAIL } from "./components/SocialIcons";
import kinoSvg from "./assets/kino-visual.svg";
import profilePhoto from "./assets/about-profile-photo.png";

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

interface CertificationEntry {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
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

  const certifications: CertificationEntry[] = [
    { title: "Start the UX Design Process: Empathize, Define, and Ideate", issuer: "Google", date: "Jul 2023", credentialId: "RPJDTE4EH4FC" },
    { title: "Foundations of User Experience (UX) Design", issuer: "Google", date: "Jan 2023", credentialId: "ELVXHPESFQSN" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        fontFamily: tokens.font.sans,
        color: "var(--text-secondary)",
        position: "relative",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      <TopNav />

      <style>{`
        @media (max-width: 1024px) {
          .about-main-container {
            flex-direction: row !important;
            gap: 32px !important;
            padding-top: 60px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
            min-height: auto !important;
            flex-wrap: wrap !important;
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

        @media (max-width: 768px) {
          .about-main-container {
            gap: 24px !important;
          }
        }

        @media (max-width: 640px) {
          .about-main-container {
            flex-direction: column !important;
            padding-left: 15px !important;
            padding-right: 15px !important;
            padding-top: 40px !important;
            gap: 24px !important;
            min-height: auto !important;
            position: relative !important;
          }

          .about-profile-card {
            flex-direction: row !important;
            align-items: flex-start !important;
            height: auto !important;
            gap: 18px !important;
            width: auto !important;
            padding: 0 !important;
          }

          .about-profile-card img {
            width: 63px !important;
            height: 61px !important;
          }

          .about-content-panel {
            width: 100% !important;
            max-width: none !important;
            gap: 29px !important;
          }

          .about-hello-section {
            font-weight: 400 !important;
            color: var(--text-grey-light) !important;
          }

          .about-paragraph-slide {
            font-weight: 400 !important;
            color: var(--text-grey-light) !important;
          }
        }

        .about-paragraph-slide {
          /* No animation */
        }

        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
          opacity: 1;
          animation: none;
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
            paddingTop: "60px",
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
              gap: "12px",
              width: "auto",
              height: "auto",
              position: "relative",
              zIndex: 10,
            }}
          >
            {/* Profile Image */}
            <img
              src={profilePhoto}
              alt="Laney Fong"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "100px",
                objectFit: "cover",
                flexShrink: 0,
                filter: "grayscale(100%)",
              }}
            />

            {/* Name and Subtitle */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0",
                paddingTop: "0",
                gap: "6px",
                width: "auto",
              }}
            >
              <h2
                style={{
                  fontFamily: tokens.font.sans,
                  fontWeight: 500,
                  fontSize: "24px",
                  lineHeight: "33px",
                  letterSpacing: "-0.05em",
                  color: "var(--text-dark)",
                  margin: "0",
                  padding: "0",
                }}
              >
                Laney Fong
              </h2>
              <p
                style={{
                  fontFamily: tokens.font.sans,
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
              className="about-hello-section"
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "22px",
                letterSpacing: "-0.05em",
                color: "var(--text-grey-light)",
                margin: "0",
                padding: "0",
              }}
            >
              Hello!
            </h3>

            {/* Bio text */}
            <p
              className="about-paragraph-slide"
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "22px",
                letterSpacing: "-0.05em",
                color: "var(--text-grey-light)",
                margin: "0",
                padding: "0",
                marginTop: "0",
                opacity: 1,
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
                  margin: 0,
                  padding: 0,
                }}
              />
              <h4
                style={{
                  fontFamily: tokens.font.sans,
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
                        fontFamily: tokens.font.sans,
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "22px",
                        letterSpacing: "-0.05em",
                        color: "var(--text-dark)",
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
                        fontFamily: tokens.font.sans,
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "22px",
                        letterSpacing: "-0.05em",
                        color: "var(--text-dark)",
                      }}
                    >
                      {exp.company}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: tokens.font.sans,
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "19px",
                      letterSpacing: "-0.05em",
                      color: "var(--text-grey-dark)",
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
                  margin: 0,
                  padding: 0,
                }}
              />
              <h4
                style={{
                  fontFamily: tokens.font.sans,
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
                      fontFamily: tokens.font.sans,
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "22px",
                      letterSpacing: "-0.05em",
                      color: "var(--text-dark)",
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
                      fontFamily: tokens.font.sans,
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
                      fontFamily: tokens.font.sans,
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "19px",
                      letterSpacing: "-0.05em",
                      color: "var(--text-grey-dark)",
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
                    border: "none",
                  borderTop: "1px solid #DCDCDC",
                  }}
                />
                <h4
                  style={{
                    fontFamily: tokens.font.sans,
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
                          fontFamily: tokens.font.sans,
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "22px",
                          letterSpacing: "-0.05em",
                          color: "var(--text-dark)",
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
                          fontFamily: tokens.font.sans,
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "22px",
                          letterSpacing: "-0.05em",
                          color: "var(--text-dark)",
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
                    border: "none",
                  borderTop: "1px solid #DCDCDC",
                  }}
                />
                <h4
                  style={{
                    fontFamily: tokens.font.sans,
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
                          fontFamily: tokens.font.sans,
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "22px",
                          letterSpacing: "-0.05em",
                          color: "var(--text-dark)",
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
                          fontFamily: tokens.font.sans,
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
                          fontFamily: tokens.font.sans,
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "19px",
                          letterSpacing: "-0.05em",
                          color: "var(--text-grey-dark)",
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

            {/* Certifications Section */}
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
                    border: "none",
                  borderTop: "1px solid #DCDCDC",
                  }}
                />
                <h4
                  style={{
                    fontFamily: tokens.font.sans,
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "22px",
                    letterSpacing: "-0.05em",
                    color: "#868585",
                    margin: "0",
                    padding: "0",
                  }}
                >
                  Certifications
                </h4>
              </div>

              {/* Certifications entries */}
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
                {certifications.map((cert, index) => (
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
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        padding: "0",
                        gap: "16px",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: tokens.font.sans,
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "22px",
                          letterSpacing: "-0.05em",
                          color: "var(--text-dark)",
                          flex: 1,
                        }}
                      >
                        {cert.title}
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
                          fontFamily: tokens.font.sans,
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "19px",
                          letterSpacing: "-0.05em",
                          color: "rgba(146, 146, 146, 0.933333)",
                        }}
                      >
                        {cert.issuer} • {cert.date}
                      </span>
                      <span
                        style={{
                          fontFamily: tokens.font.sans,
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "19px",
                          letterSpacing: "-0.05em",
                          color: "var(--text-grey-dark)",
                          flexShrink: 0,
                        }}
                      >
                        {cert.credentialId}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Software Stack Section */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0",
                gap: "32px",
                width: "100%",
                paddingTop: "100px",
              }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: tokens.font.sans,
                    fontWeight: 500,
                    fontSize: "16px",
                    letterSpacing: "-0.05em",
                    color: "var(--text-dark)",
                    marginBottom: "24px",
                    margin: "0 0 24px 0",
                  }}
                >
                  Software Stack
                </h4>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                  gap: "24px",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                {/* Figma */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    borderRadius: "12px",
                    background: "var(--surface-light)",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="10" cy="10" r="8" fill="#A259FF" />
                    <circle cx="30" cy="10" r="8" fill="#F24E1E" />
                    <circle cx="30" cy="30" r="8" fill="#FF7262" />
                    <circle cx="10" cy="30" r="8" fill="#1ABCFE" />
                    <circle cx="20" cy="20" r="8" fill="#0ACF83" />
                  </svg>
                  <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-dark)", textAlign: "center" }}>Figma</span>
                </div>

                {/* Claude */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    borderRadius: "12px",
                    background: "var(--surface-light)",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" fill="#9D4EDD" />
                    <path d="M20 10L26 18H14L20 10Z" fill="white" />
                    <path d="M14 22H26L20 30L14 22Z" fill="white" opacity="0.7" />
                  </svg>
                  <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-dark)", textAlign: "center" }}>Claude</span>
                </div>

                {/* Cursor */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    borderRadius: "12px",
                    background: "var(--surface-light)",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" fill="#09D9C4" />
                    <path d="M14 18L22 10L26 26L18 22Z" fill="white" />
                  </svg>
                  <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-dark)", textAlign: "center" }}>Cursor</span>
                </div>

                {/* Lovable */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    borderRadius: "12px",
                    background: "var(--surface-light)",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M20 34C10.6 34 3 26.4 3 17C3 11.2 6.4 6.2 11.2 3.8C12.4 3.2 13.8 2.8 15.2 2.8C17.8 2.8 20 4.4 20 6.8C20 4.4 22.2 2.8 24.8 2.8C26.2 2.8 27.6 3.2 28.8 3.8C33.6 6.2 37 11.2 37 17C37 26.4 29.4 34 20 34Z" fill="#FF2D5D" />
                  </svg>
                  <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-dark)", textAlign: "center" }}>Lovable</span>
                </div>

                {/* GitHub */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    borderRadius: "12px",
                    background: "var(--surface-light)",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" fill="var(--text-dark)" />
                    <path d="M20 8C13.4 8 8 13.4 8 20C8 25.7 12.2 30.4 17.7 31.7C18.4 31.8 18.6 31.4 18.6 31V27.8C14.9 28.5 14 26.1 14 26.1C13.4 24.4 12.5 24 12.5 24C11.2 23.2 12.6 23.2 12.6 23.2C14 23.3 14.8 24.5 14.8 24.5C16 26.7 17.9 26.2 18.7 25.8C18.8 25 19.1 24.5 19.5 24.2C16.5 23.9 13.2 22.8 13.2 18.3C13.2 16.8 13.8 15.5 14.8 14.5C14.6 14.2 14.1 12.8 15 10.9C15 10.9 16.1 10.5 18.6 12C19.5 11.8 20.5 11.7 21.5 11.7C22.5 11.7 23.5 11.8 24.4 12C26.9 10.5 28 10.9 28 10.9C28.9 12.8 28.4 14.2 28.2 14.5C29.2 15.5 29.8 16.8 29.8 18.3C29.8 22.8 26.5 23.9 23.5 24.2C24 24.6 24.5 25.5 24.5 26.8V31C24.5 31.4 24.7 31.8 25.4 31.7C30.8 30.4 35 25.7 35 20C35 13.4 29.6 8 20 8Z" fill="white" />
                  </svg>
                  <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-dark)", textAlign: "center" }}>GitHub</span>
                </div>

                {/* Adobe Creative Cloud */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    borderRadius: "12px",
                    background: "var(--surface-light)",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" fill="#FF0000" />
                    <text x="20" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial">Cc</text>
                  </svg>
                  <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-dark)", textAlign: "center" }}>Adobe CC</span>
                </div>
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
