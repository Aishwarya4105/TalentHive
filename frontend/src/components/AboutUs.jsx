import { FaUser, FaBuilding, FaBullseye, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";


function AboutUs() {
  return (
   
    <div className="about-page" id="about">

      {/* HERO */}
      <section className="about-hero">
        <h1>About <span>TalentHive</span></h1>
        <p>
          Connecting talent with opportunity. Helping companies build the future.
        </p>
      </section>

      {/* CARDS */}
      <section className="about-cards">

        <div className="about-card">
          <FaUser className="icon blue" />
          <h3>For Job Seekers</h3>
          <ul>
            <li>Search jobs easily</li>
            <li>Apply instantly</li>
            <li>Manage your profile</li>
            <li>Track applications</li>
          </ul>
        </div>

        <div className="about-card">
          <FaBuilding className="icon green" />
          <h3>For Employers</h3>
          <ul>
            <li>Post job openings</li>
            <li>Find top talent</li>
            <li>Manage applicants</li>
            <li>Hire efficiently</li>
          </ul>
        </div>

        <div className="about-card">
          <FaBullseye className="icon purple" />
          <h3>Our Mission</h3>
          <p>
            To bridge the gap between talent and opportunity through a simple,
            powerful platform.
          </p>
        </div>

        <div className="about-card">
          <FaEye className="icon orange" />
          <h3>Our Vision</h3>
          <p>
            To become a trusted platform where careers grow and companies thrive.
          </p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">

          <div>
            <h2>TalentHive</h2>
            <p>Find the right job.</p>
            <p>Build your future.</p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <Link to="/"><p>Home</p></Link> 
             <Link to="/jobs"><p>jobs</p></Link> 
            <Link to="/about"><p>About</p></Link> 
           
          </div>

          <div>
            <h3>For Users</h3>
            <p>Browse Jobs</p>
            <p>Profile</p>
            <p>Applications</p>
          </div>

          <div>
            <h3>Contact</h3>
            <p>info@talenthive.com</p>
            <p>Bengaluru, India</p>
          </div>

        </div>

        <div className="copyright">
          © 2026 TalentHive. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

export default AboutUs;