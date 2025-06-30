import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ResumeItem from "./ResumeItem";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import bgImage from '../spirograph-pattern-drawing-backgrounds-textures-a17aa5-1024.webp'; // Adjust path relative to this file


export default function Portfolio() {
  const [bgColor, setBgColor] = useState("#6495ED"); // start with blue background
  const [navColor, setNavColor] = useState("#6495ED");
  const [isPastExperience, setIsPastExperience] = useState(false);
  const sectionsRef = useRef({});
  const sectionIds = ["About", "Experience", "Contact"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const rgbToHex = ([r, g, b]) =>
    `#${[r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")}`;

  const interpolateColor = (color1, color2, factor) => {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const result = c1.map((c, i) => Math.round(c + factor * (c2[i] - c)));
    return rgbToHex(result);
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: false, offset: 100 });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const viewportBottom = scrollY + windowHeight;

      const snapshotEl = sectionsRef.current["snapshot"];
      const snapshotBottom = snapshotEl ? snapshotEl.offsetTop + snapshotEl.offsetHeight : 0;

      const contactTop = sectionsRef.current["contact"]?.offsetTop ?? 0;

      if (viewportBottom < snapshotBottom) {
        // While snapshot section is still visible: gradient background
        setBgColor("#6495ED");
        setNavColor("#6495ED");
        setIsPastExperience(false);
      } else {
        // After snapshot section passed: transition solid background colors as before
        setIsPastExperience(viewportBottom >= contactTop);

        const aboutTop = sectionsRef.current["about"]?.offsetTop ?? 0;

        if (viewportBottom < aboutTop) {
          setBgColor("#6495ED");
          setNavColor("#6495ED");
        } else if (viewportBottom < contactTop) {
          const factor = Math.min(
            1,
            (viewportBottom - aboutTop) / (contactTop - aboutTop)
          );
          const bg = interpolateColor("#6495ED", "#CCCCFF", factor);
          setBgColor(bg);

          const navCol = interpolateColor("#6495ED", "#CCCCFF", factor);
          setNavColor(navCol);
        } else {
          setBgColor("#CCCCFF");
          setNavColor("#CCCCFF");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSnapshotEnd = () => {
    const snapshot = sectionsRef.current["snapshot"];
    if (snapshot) {
      const offset = snapshot.offsetTop + snapshot.offsetHeight;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  const scrollToSection = (id) => {
    const section = sectionsRef.current[id];
    if (section) {
      const offsetTop = section.offsetTop - 70; // adjust if you have sticky header
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  const experiences = [
    {
      title: "District Support Pharmacist",
      company: "CVS Pharmacy",
      startDate: "November 2022",
      endDate: "October 2023",
      details: [
        "Reduced patient access delays by managing prior authorization workflows and liaising with physicians and patients.",
        "Adapted quickly to different pharmacy locations, seamlessly integrating into new teams and workflows while maintaining high standards of patient care and regulatory compliance.",
        "Ensured compliance with documentation standards during mass vaccination events and contributed to accurate record-keeping for 600+ immunizations daily.",
      ],
    },
    {
      title: "Staff Pharmacist",
      company: "Walgreens",
      startDate: "February 2022",
      endDate: "November 2022",
      details: [
        "Supervised a team of 5 pharmacy technicians, overseeing fulfillment of 1,400+ prescriptions weekly while ensuring operational and regulatory adherence.",
        "Educated patients on medications, ensuring compliance with HIPAA and pharmacy regulations.",
        "Maintained up-to-date knowledge of regulatory laws and new pharmaceutical formulations."
      ],
    },
    {
      title: "Pharmacy Intern",
      company: "Beth Israel Lahey Health Specialty Pharmacy",
      startDate: "March 2021",
      endDate: "May 2021",
      details: [
        "Performed detailed compliance audits to ensure adherence to the Accreditation Commission for Health Care (ACHC), The Joint Commission, and Utilization Review Accreditation Commission (URAC) standards.",
        "Reviewed and documented regulatory changes across multiple state jurisdictions, supporting internal policy alignment and operational compliance.",
        "Researched and presented policy requirements for opening a home infusion pharmacy to executive leadership."
      ],
    },
    {
      title: "Pharmacy Intern",
      company: "CVS Pharmacy",
      startDate: "March 2017",
      endDate: "May 2021",
      details: [
        "Conducted 200+ weekly patient care calls to ensure medication adherence and address compliance risks.",
        "Trained new pharmacy technicians on prescription fulfillment and inventory management procedures.",
        "Resolved third-party payer rejections and facilitated prescription transfers, ensuring continuity of care."
      ],
    },
  ];

  return (
    <>
      {/* Full page background with dynamic bgColor */}
      <div
        className="fixed top-0 left-0 w-full h-full -z-10 transition-all duration-300 ease-linear"
        style={{ background: bgColor }}
      />

      {/* Header with navigation */}
      <header className="bg-white shadow-md py-6 sticky top-0 z-30 w-full">
        <div className="max-w-6xl mx-auto flex justify-end items-center px-4">
      
      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-6">
        {sectionIds.map((id) =>
          id.toLowerCase() === "about" ? (
            <button
              key={id}
              onClick={scrollToSnapshotEnd}
              className="hover:underline capitalize transition-colors duration-300"
              style={{ color: navColor }}
            >
              {id}
            </button>
          ) : (
            <button
              key={id}
              onClick={() => scrollToSection(id.toLowerCase())}
              className="hover:underline capitalize transition-colors duration-300"
              style={{ color: navColor }}
            >
              {id}
            </button>
          )
        )}
      </nav>

      {/* Mobile hamburger */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl text-black focus:outline-none"
        >
          {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>

        {/* Dropdown menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
            <ul className="flex flex-col space-y-2 p-4">
              {sectionIds.map((id) => (
                <li key={id}>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (id.toLowerCase() === "about") scrollToSnapshotEnd();
                      else scrollToSection(id.toLowerCase());
                    }}
                    className="block w-full text-left text-gray-800 hover:text-blue-500"
                  >
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 min-h-screen text-gray-900 font-sans max-w-6xl mx-auto">
        {/* Snapshot section: transparent background so gradient from full bg shows through */}
        <section
          id="snapshot"
          ref={(el) => (sectionsRef.current["snapshot"] = el)}
          className="relative w-full h-screen flex flex-col justify-center items-center px-4"
          style={{ backgroundColor: "transparent" }}
        >
          <img
            src={bgImage}
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-20 pointer-events-none"
            style={{ zIndex: 0 }}
          />

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg text-center">
            Erika Seto
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-white drop-shadow-md text-center">
            Software Development Student
          </p>
        </section>

        {/* About section */}
        <section
          id="about"
          ref={(el) => (sectionsRef.current["about"] = el)}
          data-aos="fade-up"
          className="scroll-mt-16 bg-white rounded-3xl px-4 sm:px-8 py-8 sm:py-12 my-16 shadow-lg"

        >
          <h2 className="text-4xl font-semibold mb-4">About Me</h2>
          <p className="text-lg text-left mb-6">
            I am a pharmacist currently pursuing a Master of Science in Software Development at Boston University, 
            with an expected graduation date of December 2025. 
            I bring a unique blend of clinical skills and expertise in regulatory compliance, 
            policy interpretation, and accreditation standards compliance, 
            combined with a strong foundation in software development.
            </p>
            <p className="text-lg text-left">
            Through my coursework—including Information Systems Analysis and Design, Data Structures and Algorithms, 
            Data Science with Python, and Web Application Development—I have developed solid skills in programming, 
            problem-solving, and designing efficient systems. I am passionate about leveraging my diverse background 
            to drive meaningful impact.
          </p>
        </section>

        {/* Experience section */}
        <section
          id="experience"
          ref={(el) => (sectionsRef.current["experience"] = el)}
          // data-aos="fade-up"
          className="scroll-mt-16 bg-white rounded-3xl px-4 sm:px-8 py-8 sm:py-12 my-16 shadow-lg"
        >
          <h2 className="text-4xl font-semibold mb-16 text-center">Experience</h2>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical timeline line */}
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 z-0 transition-colors duration-500"
              style={{ backgroundColor: navColor }}
            />

            {experiences.map((item, idx) => {
              const index = idx + 1;
              const isLeft = index % 2 === 1;

              return (
                <div
                  key={index}
                  className="relative w-full mb-20 md:mb-24"
                  style={{ minHeight: "8rem" }}
                >
                  {/* Timeline Dot */}
            <div
              className="hidden md:block absolute left-1/2 w-6 h-6 border-2 border-white rounded-full z-10"
              style={{
                top: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: navColor,
              }}
            />

            {/* Card + arrow container */}
            <div
              className={`
                flex flex-col md:flex-row items-center gap-4
                w-full md:w-1/2 md:max-w-3xl
                px-4 md:px-6
                ${isLeft ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"}
              `}
            >

            {/* Left-side arrow for right-side card */}
            {!isLeft && (
              <div className="hidden md:flex items-center">
                <div
                  className="w-0 h-0 border-y-[12px] border-y-transparent border-r-[12px]"
                  style={{ borderRightColor: navColor }}
                />
              </div>
            )}

            {/* Card itself */}
            <ResumeItem
              index={index}
              title={item.title}
              company={item.company}
              startDate={item.startDate}
              endDate={item.endDate}
              details={item.details}
            />

            {/* Right-side arrow for left-side card */}
            {isLeft && (
              <div className="hidden md:flex items-center">
                <div
                  className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[12px]"
                  style={{ borderLeftColor: navColor }}
                />
              </div>
            )}
          </div>
              </div>
            );
          })}
          </div>
        </section>
        

        {/* Contact section */}
        <section
          id="contact"
          ref={(el) => (sectionsRef.current["contact"] = el)}
          data-aos="fade-up"
          className="scroll-mt-16 bg-white rounded-3xl px-4 sm:px-8 py-8 sm:py-12 my-16 shadow-lg"
        >
          <h2 className="text-4xl font-semibold mb-8">Contact</h2>
          <p className="mb-6"></p>

          <div className="flex justify-center space-x-8">
            <a
              href="https://www.linkedin.com/in/erika-seto/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36 bg-[#CCCCFF] 
              text-white rounded-md hover:bg-[#6495ED] transition select-none"
            >
              <FaLinkedin className="w-12 h-12 sm:w-20 sm:h-20 mb-1" />
              <span className="text-xs font-medium text-center leading-none">
                LinkedIn
              </span>
            </a>

            <a
              href="mailto:seto.erika@gmail.com"
              className="flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36 bg-[#CCCCFF] 
              text-white rounded-md hover:bg-[#6495ED] transition select-none"
            >
              <HiOutlineMail className="w-12 h-12 sm:w-20 sm:h-20 mb-1" />
              <span className="text-xs font-medium text-center leading-none">
                Email
              </span>
            </a>
          </div>
        </section>

        <footer className="text-center py-6 text-sm text-gray-500 mb-10">
          &copy; {new Date().getFullYear()} Erika Seto. All rights reserved.
        </footer>
      </main>
    </>
  );
}
