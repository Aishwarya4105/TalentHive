import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";

function Companies() {

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/companies"
      );

      setCompanies(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="companies-page">

      <div className="companies-hero">
        <h1>Top Companies</h1>

        <p>
          Discover companies hiring on TalentHive
        </p>
      </div>

      <div className="companies-grid">

        {companies.map((company, index) => (

          <div className="company-card" key={index}>

            <img
              src={
                company.company_logo
                  ? `http://localhost:5000/${company.company_logo}`
                  : "https://via.placeholder.com/100"
              }
              alt="logo"
            />

            <h3>
              {company.company_name || "Company"}
            </h3>

            <span className="company-location">
              📍 {company.location || "Unknown"}
            </span>

            <p>
              {company.company_about || "No description available"}
            </p>

            <div className="company-footer">
              <span>✨ Hiring on TalentHive</span>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Companies;